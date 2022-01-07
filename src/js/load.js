// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
require('dotenv').config()
const fs = require('fs').promises
const {XMLParser} = require('fast-xml-parser')
const Database = require('better-sqlite3')
const yellow = require('chalk').yellow
const blue = require('chalk').blue
const black = require('chalk').black
const green = require('chalk').green

main()

async function main () {

	console.log(black.bgWhiteBright(`Start: ${new Date()}`))
	
	const db = new Database(process.env.pubmed_db_control_db, { verbose: console.log })

	let sql = `	
		SELECT trim(name, '.gz') as name
		FROM pubmed_ftp
		WHERE name like '%gz'
		  and sts = 'NEW'
		ORDER BY name
	`

	const res = db.prepare(sql)
	
	for (const xmlfile of res.iterate()) {
		try {
			await load(xmlfile.name)	  
		} catch (err) {
			console.log("sql-loop >>>", err)
		}
	}	

	db.close()
	console.log(chalk.black.bgWhiteBright(`End: ${new Date()}`))	
}

async function load (xmlfile) {
	
	return new Promise( async (resolve, reject) => {
		
		var message = ''
		var errorApend = ''
		var upserted = 0
		var modified = 0
		var removed = 0

		const options = {
			ignoreAttributes : false,
			attributeNamePrefix : "",
			textNodeName: "value",
			allowBooleanAttributes: true
		};
		const parser = new XMLParser(options);
		
		// prepare for mongo connection
		const MongoClient = require('mongodb').MongoClient
		const client = new MongoClient(process.env.pubmed_db_mongo_uri, { useUnifiedTopology: true })
		
		function start() {
			startTime = new Date()
		}
		
		function end() {
  			endTime = new Date()
  			var timeDiff = endTime - startTime //in ms
  			var msec = timeDiff
  			
  			var hh = Math.floor(msec / 1000 / 60 / 60)
  			msec -= hh * 1000 * 60 * 60
  			
  			var mm = Math.floor(msec / 1000 / 60)
  			msec -= mm * 1000 * 60
  			
  			var ss = Math.floor(msec / 1000)
  			msec -= ss * 1000 
  			
  			var seconds = Math.round(timeDiff)
  			var minutes = Math.round(seconds / 60, 2)
  			// console.log(chalk.blue(`file: ${chalk.yellow(x)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} h:m:s`))
  			message = chalk.blue(`file: ${chalk.yellow(xmlfile)} upserted: ${chalk.yellow(upserted)} modified: ${chalk.yellow(modified)} removed: ${chalk.yellow(removed)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} hh:mm:ss ${errorApend}`)
			console.log(message)
		}
		
		start()
		
		client.connect( async (err, client) => {
			
			if (err) reject(err)
			
			const db = client.db('pubmed')
			const docs = db.collection('articles')
			
			let file = process.env.pubmed_db_xml + xmlfile
			
			fs.readFile(file)
			.then( async function(data) {
				
				let jsonObj = parser.parse(data)
					
				// console.log(chalk.yellow("prepping deletions"))
				
				if (
					typeof jsonObj.PubmedArticleSet.DeleteCitation != 'undefined' && 
					typeof jsonObj.PubmedArticleSet.DeleteCitation.PMID != 'undefined' && 
					jsonObj.PubmedArticleSet.DeleteCitation.PMID.length > 0) {
					
					const bulkDel = docs.initializeUnorderedBulkOp()
					
					for (const index in jsonObj.PubmedArticleSet.DeleteCitation.PMID) {
						
						let doc = {}
						doc.PMID = {}
						doc.PMID.value = jsonObj.PubmedArticleSet.DeleteCitation.PMID[index].value
						doc.PMID.Version = jsonObj.PubmedArticleSet.DeleteCitation.PMID[index].Version
						
						// console.log(JSON.stringify(doc))
						bulkDel.find( doc ).deleteOne()
					}
					
					let res = await bulkDel.execute().catch(err => {
						errorApend = chalk.yellow(`err: ${err})`)
						return {nRemoved: 0}
					})
					
					// console.log(chalk.yellow("bulk del done"))
					removed = res.nRemoved	
				}
				
				// console.log(chalk.yellow("prepping upserts"))
				if (
					typeof jsonObj.PubmedArticleSet.PubmedArticle != 'undefined' && 
					jsonObj.PubmedArticleSet.PubmedArticle.length > 0) {
					
					const bulkUpd = docs.initializeUnorderedBulkOp()
					
					for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
										
						let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
						doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
						doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
						doc.xmlfile = xmlfile
						
						bulkUpd.find( {_id: doc._id} ).upsert().replaceOne( doc )	
					}
					
					let res = await bulkUpd.execute().catch(err => {
						errorApend = chalk.yellow(`err: ${err})`)
						return {nUpserted: 0, nModified: 0}
					})
					
					// console.log(chalk.yellow("bulk upsert done"))
					upserted = res.nUpserted
					modified = res.nModified	
				}
				
				client.close()
				end()
				resolve()
			})
			.catch(function(error) {
				reject(error)
			})
		})
	})
}
