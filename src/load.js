// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
require('dotenv').config()
const fs = require('fs').promises
const {XMLParser} = require('fast-xml-parser')
const Database = require('better-sqlite3')
const yellow = require('chalk').yellow
const blue = require('chalk').blue
const black = require('chalk').black
const green = require('chalk').green
const solr = require('solr-client')

// main()

async function main () {

	console.log(black.bgWhiteBright(`Loading start: ${new Date()}`))
	
	const db = new Database(process.env.pubmed_db_control_db, { /* verbose: console.log */ })
	let sql = `	
		SELECT name
		FROM pubmed_ftp
		WHERE name like '%gz'
		  and sts = 'NEW'
		ORDER BY name
	`
	const rows = db.prepare(sql).all()
	
	for (const row of rows) {
		try {
			if (await md5_ok(row.name)) {
				delete_me = await unzip(row.name)
				await load(delete_me)
				await fs.unlink(delete_me)
				sql = `
					UPDATE pubmed_ftp
					set sts='LOADED'
					WHERE name='${row.name}'
				`
				const res = db.prepare(sql).run()
			} else {
				err = `md5 check failed`
				console.log(blue(`${err} for ${yellow(row.name)}`))
				break	
			}  
		} catch (err) {
			console.log("sql-loop >>>", err)
		}
	}	

	db.close()
	console.log(black.bgWhiteBright(`Loading end: ${new Date()}`))	
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
		}
		const parser = new XMLParser(options)
		
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
			message = blue(`file: ${yellow(xmlfile)} upserted: ${yellow(upserted)} modified: ${yellow(modified)} removed: ${yellow(removed)} duration ${yellow(`${hh}:${mm}:${ss}`)} hh:mm:ss ${errorApend}`)
			console.log(message)
		}
		
		start()
		
		client.connect( async (err, client) => {
			
			if (err) reject(err)
			
			const db = client.db(process.env.pubmed_db_mongo_dbname)
			const docs = db.collection(process.env.pubmed_db_mongo_collection)
			const solr_errors = db.collection('solr_errors')
			const solr_client = solr.createClient({host:'localhost', core: process.env.pubmed_db_mongo_dbname })
			
			fs.readFile(xmlfile)
			.then( async function(data) {
				
				let jsonObj = parser.parse(data)
				
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
						await solr_client.deleteByID(doc.PMID.value).catch(err => {
							let o = {}
							o.fn = 'delete'
							o.xml = xmlfile
							o.obj = doc
							o.err = err
							solr_errors.insertOne(o)
						})
					}
					
					let res = await bulkDel.execute().catch(err => {
						errorApend = yellow(`err: ${err})`)
						return {nRemoved: 0}
					})
					
					removed = res.nRemoved	
					
					await solr_client.commit().catch(err => {
						let o = {}
						o.fn = 'delete-commit'
						o.xml = xmlfile
						o.err = err
						solr_errors.insertOne(o)
					})
				}
				
				if (
					typeof jsonObj.PubmedArticleSet.PubmedArticle != 'undefined' && 
					jsonObj.PubmedArticleSet.PubmedArticle.length > 0) {
					
					const bulkUpd = docs.initializeUnorderedBulkOp()
					const solr_docs = []
					
					for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
										
						let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
						doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
						doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
						doc.xmlfile = xmlfile
						
						bulkUpd.find( {_id: doc._id} ).upsert().replaceOne( doc )	
						
						try {
							solr_docs.push(solr_doc(doc))	
						} catch (err) {
							let o = {}
							o.fn = 'upsert-solr_doc'
							o.xml = xmlfile
							o.obj = doc
							o.err = err
							solr_errors.insertOne(o)							
						}
						
					}
					
					let res = await bulkUpd.execute().catch(err => {
						errorApend = yellow(`err: ${err})`)
						return {nUpserted: 0, nModified: 0}
					})
					
					upserted = res.nUpserted
					modified = res.nModified	
					
					try {
						await solr_client.add(solr_docs)
						await solr_client.commit().catch(err => {
							let o = {}
							o.fn = 'upsert-commit'
							o.xml = xmlfile
							o.err = err
							solr_errors.insertOne(o)
						})						
					} catch (err) {
						let o = {}
						o.fn = 'upsert-docs'
						o.xml = xmlfile
						o.err = err						
					}
					
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

function solr_doc(mongo) {
	
	try {	
		let obj = {}
		obj.id = mongo.PMID.value
		obj.title = null
		obj.abstract = null
		obj.version = (mongo.PMID.Version) ? mongo.PMID.Version : ' '
		
		// Work out title
		if (mongo.Article.ArticleTitle) {
			let t = mongo.Article.ArticleTitle
			if (typeof t == 'object') obj.title = t.value
			if (typeof t == 'string') obj.title = t
		} else {
			obj.title = ' '
		}
		
		// Work out abstract
		if (mongo.Article.Abstract && 
			mongo.Article.Abstract.AbstractText) {
				let a = mongo.Article.Abstract.AbstractText
				if (Array.isArray(a)) {
					for (item of a) {
						obj.abstract = obj.abstract + ' ' + item.value
					}
				} else {
					if (typeof a == 'object') {
						if (a.hasOwnProperty('value')) {
							obj.abstract = a.value
						} 
						if (a.hasOwnProperty('i')) {
							if (Array.isArray(a.i)) {
								for (item of a.i) {
									obj.abstract = obj.abstract + ' ' + item.value
								}
							} else {
								if (typeof a.i == 'string') obj.abstract = a.i
							}
						}
					}
					if (typeof a == 'string') obj.abstract = a	
				}
		} else {
			obj.abstract = ' '
		}
		
		return obj
		
	} catch (err) {
		console.log(JSON.stringify(mongo,null,2))	
		throw err
	}
}

function md5_ok (file) {
	const fs = require('fs')
	const crypto = require('crypto')
	return new Promise( async (resolve, reject) => {
		try {
			gzip_file = process.env.pubmed_db_downloads + file
			md5_file  = gzip_file + '.md5'
			
			const buff = fs.readFileSync(md5_file, 'UTF-8')
			const expectedMD5 = buff.split("=")[1].trim()
			
			const buff2 = fs.readFileSync(gzip_file)
			const hashSum = crypto.createHash('md5').update(buff2)
			const actualMD5 = hashSum.digest('hex')		
			resolve((expectedMD5===actualMD5))	
		} catch (err) {
			reject(err)
		}
	})
}

function unzip (file) {
	const fs = require('fs')
	const Gunzip = require('minizlib').Gunzip
	
	xmlFile = file.replace('.gz','')
	
	return new Promise( async (resolve, reject) => {
		try {
			const input = fs.createReadStream(process.env.pubmed_db_downloads + file)
			const output = fs.createWriteStream(process.env.pubmed_db_xml + xmlFile)
			
			const decode = new Gunzip()
			
			input.pipe(decode).pipe(output)
			output.on('finish', () => resolve(process.env.pubmed_db_xml + xmlFile))			
		} catch (err) {
			reject(err)
		}
	})
}

module.exports.run = main