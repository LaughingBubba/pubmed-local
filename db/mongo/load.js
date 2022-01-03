// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
const fs = require('fs').promises
const chalk = require('chalk')
const {XMLParser} = require('fast-xml-parser')
const sqlite3 = require('sqlite3').verbose()
const Database = require('better-sqlite3')

require('dotenv').config()

main()

async function main () {

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
	
}

async function load (xmlfile) {
	
	return new Promise( async (resolve, reject) => {

		const options = {
			ignoreAttributes : false,
			attributeNamePrefix : "",
			textNodeName: "value",
			allowBooleanAttributes: true
		};
		const parser = new XMLParser(options);
		
		// prepare for mongo connection
		const MongoClient = require('mongodb').MongoClient
		// const url = 'mongodb:root:access@localhost:27017/?authSource=admin'
		const url = 'mongodb://root:access@localhost:27018'
		const dbName = 'pubmed'
		const client = new MongoClient(url, { useUnifiedTopology: true })
		
		function start() {
			startTime = new Date()
			console.log(chalk.blue(xmlfile), chalk.black.bgWhiteBright(`Start: ${startTime}`))
		}
		
		function end() {
			endTime = new Date()
			var timeDiff = endTime - startTime //in ms
			timeDiff /= 1000
			
			var seconds = Math.round(timeDiff)
			var minutes = Math.round(seconds / 60, 2)
			console.log(chalk.blue(xmlfile), chalk.black.bgWhiteBright(`End: ${endTime} duration ${minutes} mins `))
		}
		
		start()
		
		client.connect( async (err, client) => {
			
			if (err) reject(err)
			
			console.log(chalk.blue('Connected successfully to server'))
			
			const db = client.db(dbName)
			console.log(chalk.blue(`Switched to ${db.databaseName} database`))
			const docs = db.collection('articles')
			
			let bulk = docs.initializeUnorderedBulkOp()
			
			let file = process.env.xml + xmlfile
			
			fs.readFile(file)
			.then( async function(data) {
				let jsonObj = parser.parse(data);
				
				for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
					// console.log(`${names[index]} is at position ${index}`)
					let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
					doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
					doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
					bulk.insert( doc )	
				}
				
				let res = await bulk.execute().catch(err => {
					console.log(chalk.black.bgYellow(err))
					return {nInserted: 0}
				})
				
				console.log(chalk.blue(`inserted:`), chalk.yellow.bold(res.nInserted))
				client.close()
				console.log(chalk.blue('Connection closed'))
				end()
				resolve()
			})
			.catch(function(error) {
	   			reject(error)
			})
		})

  	})
}