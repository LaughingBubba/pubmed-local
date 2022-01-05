// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
const fs = require('fs').promises
const chalk = require('chalk')
const {XMLParser} = require('fast-xml-parser')
const sqlite3 = require('sqlite3').verbose()
const Database = require('better-sqlite3')

require('dotenv').config()

main()

async function main () {

	console.log(chalk.black.bgWhiteBright(`Start: ${new Date()}`))

	console.log(process.env.xml)
	const pubtype = 'BASE'
	
	const db = new Database(process.env.control_db, { verbose: console.log })

	let sql = `	
		SELECT trim(name, '.gz') as name
		FROM pubmed_ftp
		WHERE pubtype = '${pubtype}'
		  and name like '%gz'
		  and size = size_dl
		ORDER BY name
	`

	const res = db.prepare(sql);
	
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
		var inserted = 0

		const options = {
			ignoreAttributes : false,
			attributeNamePrefix : "",
			textNodeName: "value",
			allowBooleanAttributes: true
		};
		const parser = new XMLParser(options);
		
		// prepare for mongo connection
		const MongoClient = require('mongodb').MongoClient
		const client = new MongoClient(process.env.mongo_uri, { useUnifiedTopology: true })
		
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
  			message = chalk.blue(`file: ${chalk.yellow(xmlfile)} inserted: ${chalk.yellow(inserted)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} hh:mm:ss ${errorApend}`)
			console.log(message)
		}
		
		start()
		
		client.connect( async (err, client) => {
			
			if (err) reject(err)
			
			const db = client.db('pubmed')
			const docs = db.collection('articles')
			
			let bulk = docs.initializeUnorderedBulkOp()
			
			let file = process.env.xml + xmlfile
			
			fs.readFile(file)
			.then( async function(data) {
				let jsonObj = parser.parse(data);
				
				for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
					
					let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
					doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
					doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
					doc.xmlfile = xmlfile
					
					bulk.find( {_id: doc._id} ).upsert().replaceOne( doc )	
				}
				
				let res = await bulk.execute().catch(err => {
					errorApend = chalk.yellow(`err: ${err})`)
					return {nInserted: 0}
				})
				
				inserted = res.nInserted
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
