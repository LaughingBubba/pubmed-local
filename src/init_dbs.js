require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const Database = require('better-sqlite3')
const superagent = require('superagent')

// main()

async function main () {
	return new Promise( async (resolve, reject) => {
		try {
			await init_sqlite()
			await init_mongo()
			await init_solr()
			resolve()
		} catch (err) {
			reject(err)
		}		
	})
}

async function init_solr () {
	return new Promise( async (resolve, reject) => {
		
		const fields = {"add-field": 				
			[
		  		{
					name: "title",
					type: "text_general",
					indexed: true,
					required: true,
		  		},
		  		{
					name: "abstract",
					type: "text_general",
					indexed: true,
					required: true,
		  		},
		  		{
					name: "version",
					type: "string",
					indexed: false,
					required: true,
				},
				  {
					name: "xmlfile",
					type: "string",
					indexed: true,
					required: true,
				}
			]	
		}
		
		try {
			superagent
			.post('http://localhost:8983/solr/pubmed/schema')
			.set('Content-type', 'application/json')
			.send(fields)
			.end((err, res) => {
				// console.log(((err) ? err : res))
				// Ignore errors if fields already exist
			})
			resolve()
		} catch (err) {
			reject(err)
		}	
		
	})
}

async function init_sqlite () {
	
	return new Promise((resolve, reject) => {
		try {
			const db = new Database(process.env.pubmed_db_control_db, { /* verbose: console.log */ })
			let sql = `	
				CREATE TABLE IF NOT EXISTS pubmed_ftp (
		  		name TEXT,
		  		size INT,
		  		pubtype TEXT,
		  		sts TEXT,
		  		err TEXT,
		  		PRIMARY KEY (name)
				);
			`
			const res = db.prepare(sql).run()	
			db.close()
			resolve()		
		} catch (err) {
			reject()
		}
	})
}

async function init_mongo () {
	
	return new Promise( async (resolve, reject) => {

		const client = new MongoClient(process.env.pubmed_db_mongo_uri, { useUnifiedTopology: true })	
		
		client.connect( async (err, client) => {
			
			if (err) reject(err)
			
			const db = client.db(process.env.pubmed_db_mongo_dbname)
			try {
				await db.createCollection(process.env.pubmed_db_mongo_collection)
			} catch (err) {
				if (err.codeName != "NamespaceExists") reject(err) 
			} 
			
			try {
				const articles = await db.collection(process.env.pubmed_db_mongo_collection)
				await articles.createIndex({ xmlfile: 1 }, {name: 'xmlfile'})
			} catch (err) {
				console.log(JSON.stringify(err))
				if (err.codeName != "NamespaceExists") reject(err)
			}
			
			try {
				const articles = await db.collection(process.env.pubmed_db_mongo_collection)
				await articles.createIndex({ PMID: 1 }, {name: 'PMID'})
			} catch (err) {
				console.log(JSON.stringify(err))
				if (err.codeName != "NamespaceExists") reject(err)
			} finally {
				client.close()
				resolve()	
			}
		})
	})
}

module.exports.run = main