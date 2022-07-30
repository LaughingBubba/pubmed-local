require('dotenv').config()
const fsPromise = require('fs').promises
const fs = require('fs')
const {XMLParser} = require('fast-xml-parser')
const Database = require('better-sqlite3')
const superagent = require('superagent')
const crypto = require('crypto')
const Gunzip = require('minizlib').Gunzip
const yellow = require('chalk').yellow
const blue = require('chalk').blue
const black = require('chalk').black
const green = require('chalk').green

const xmlFile = "../data/xml/pubmed22n1171.xml"

main()

async function main () {

	console.log(black.bgWhiteBright(`Loading start: ${new Date()}`))

	await load(xmlFile)

	console.log(black.bgWhiteBright(`Loading end: ${new Date()}`))	
}

async function load (xmlfile) {
	
	return new Promise( async (resolve, reject) => {
		
		var errorApend = ''
		var upserted = 0
		var modified = 0
		var removed = 0

		const options = {
			ignoreAttributes : false,
			attributeNamePrefix : "",
			textNodeName: "value",
			coerce: true,
			allowBooleanAttributes: true
		}
		const parser = new XMLParser(options)
		
		// prepare for mongo connection
		// const MongoClient = require('mongodb').MongoClient
		// const client = new MongoClient(process.env.pubmed_db_mongo_uri, { useUnifiedTopology: true })
		
		start()
		
// 		client.connect( async (err, client) => {
// 			
// 			if (err) reject(err)
// 			
// 			const db = client.db(process.env.pubmed_db_mongo_dbname)
// 			const docs = db.collection(process.env.pubmed_db_mongo_collection)
// 			const solr_errors = db.collection('solr_errors')
// 			
			try {
				
				count = 0
				var XmlStream = require('xml-streamr') 
				var stream=fs.createReadStream(xmlFile)
				var xml = new XmlStream(stream, {coerce: true})

				xml.on('endElement: PubmedArticle', function(item) {
					if (count == 0) {
						console.log(JSON.stringify(item,null,2))
						count = 1	
					}
				  
				});
// 				
// 				// Handle Deletions
// 				if (
// 					typeof jsonObj.PubmedArticleSet.DeleteCitation != 'undefined' && 
// 					typeof jsonObj.PubmedArticleSet.DeleteCitation.PMID != 'undefined' && 
// 					jsonObj.PubmedArticleSet.DeleteCitation.PMID.length > 0) {
// 
// 					const bulkDel = docs.initializeUnorderedBulkOp()
// 					const solr_qrys = []
// 					
// 					for (const item of jsonObj.PubmedArticleSet.DeleteCitation.PMID) {
// 						
// 						let doc = {}
// 						doc.PMID = {}
// 						doc.PMID.value = item.value
// 						doc.PMID.Version = item.Version
// 						
// 						bulkDel.find( doc ).deleteOne()
// 						solr_qrys.push({query:`(id:${doc.PMID.value}) AND (version:${doc.PMID.Version})`})
// 						
// 					}
// 					
// 					try {
// 						let res = await bulkDel.execute()
// 						removed = res.nRemoved
// 						
// 						try {
// 							await superagent
// 									.post('http://localhost:8983/solr/pubmed/update?commit=true')
// 									.set('Content-type', 'application/json')
// 									.send({delete: solr_qrys})
// 						} catch (err) {
// 							let o = {}
// 							o.fn = 'solr-del-docs'
// 							o.xml = xmlfile
// 							o.err = err.response.error.text	
// 							await solr_errors.insertOne(o)						
// 						}
// 
// 					} catch(err) {
// 						errorApend = yellow(`err: ${err})`)
// 						reject(err)
// 					}
// 					
// 				}
// 				
// 				// Handle upserts
// 				if (
// 					typeof jsonObj.PubmedArticleSet.PubmedArticle != 'undefined' && 
// 					jsonObj.PubmedArticleSet.PubmedArticle.length > 0) {
// 					
// 					const bulkUpd = docs.initializeUnorderedBulkOp()
// 					const solr_docs = []
// 					
// 					for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
// 										
// 						let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
// 						doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
// 						doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
// 						doc.xmlfile = xmlfile
// 						
// 						bulkUpd.find( {_id: doc._id} ).upsert().replaceOne( doc )	
// 						
// 						try {
// 							solr_docs.push(solr_doc(doc, xmlfile))	
// 						} catch (err) {
// 							let o = {}
// 							o.fn = 'upsert-solr_doc'
// 							o.xml = xmlfile
// 							o.obj = doc
// 							o.err = err.response.error.text	
// 							await solr_errors.insertOne(o)								
// 						}
// 						
// 					}
// 					
// 					try {
// 						let res = await bulkUpd.execute()
// 						upserted = res.nUpserted
// 						modified = res.nModified		
// 						
// 						try {
// 							await superagent
// 									.post('http://localhost:8983/solr/pubmed/update?commit=true')
// 									.set('Content-type', 'application/json')
// 									.send({add: solr_docs})
// 						} catch (err) {
// 							let o = {}
// 							o.fn = 'solr-add-docs'
// 							o.xml = xmlfile
// 							o.err = err.response.error.text	
// 							await solr_errors.insertOne(o)						
// 						}
// 						
// 					} catch (err) {
// 						errorApend = yellow(`err: ${err})`)
// 						reject(err)
// 					}
// 					
// 				}
// 				
// 				client.close()
// 				end(upserted, modified, removed, errorApend)
// 				resolve()
// 			
			} catch (err) {
				reject(err)	
			}

		// })
	})
	
			
	function start() {
		startTime = new Date()
	}
	
	function end(upserted, modified, removed, append) {
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
		let message = blue(`file: ${yellow(xmlfile)} upserted: ${yellow(upserted)} modified: ${yellow(modified)} removed: ${yellow(removed)} duration ${yellow(`${hh}:${mm}:${ss}`)} hh:mm:ss ${append}`)
		console.log(message)
	}
}

function solr_doc(mongo, xmlfile) {
	
	let obj = {}
	
	try {		
		obj.id = mongo.PMID.value
		obj.xmlfile = xmlfile
		obj.title = ''
		obj.abstract = ''
		obj.version = (mongo.PMID.Version) ? mongo.PMID.Version : ' '
		
		// Work out title
		if (mongo.Article.ArticleTitle) {
			let t = mongo.Article.ArticleTitle
			if (typeof t == 'object') obj.title = parseObj(t)
			if (typeof t == 'string') obj.title = t
			if (typeof t == 'number') obj.title = t	
		} else {
			obj.title = ' '
		}
		
		// Work out abstract
		if (mongo.Article.Abstract) {
			
			if (mongo.Article.Abstract.AbstractText) {
				let a = mongo.Article.Abstract.AbstractText
				if (typeof a == 'object') obj.abstract = parseObj(a)
				if (typeof a == 'string') obj.abstract = a
				if (typeof a == 'number') obj.abstract = a
			} else {
				obj.abstract = ' '
			}
			
		} else {
			obj.abstract = ' '
		}
		
		if (obj.title === '') obj.title = null
		if (obj.abstract === '') obj.abstract = null
		return obj
		
	} catch (err) {
		console.log(JSON.stringify(obj,null,2))	
		console.log(JSON.stringify(mongo.Article,null,2))
		throw err
	}
	
	function parseObj (obj) {
		let parsed = ''
		
		if (Array.isArray(obj)) {
			
			for (item of obj) {
				parsed = parsed + ' ' + obj.value
			}
				
		} else {
			
			if (obj.hasOwnProperty('b')) {
				if (Array.isArray(obj.b)) {
					for (item of obj.b) {
						parsed = parsed + ' ' + item.value
					}
				} else {
					if (typeof obj.b == 'string') parsed = parsed + ' ' + obj.b
					if (typeof obj.b == 'string') parsed = parsed + ' ' + obj.b
					if (typeof obj.b == 'object') parsed = parsed + ' ' + parseObj(obj.b)
				}
			}
			if (obj.hasOwnProperty('value')) {
				parsed = parsed + ' ' +  obj.value
			} 							
			if (obj.hasOwnProperty('i')) {
				if (Array.isArray(obj.i)) {
					for (item of obj.i) {
						parsed = parsed + ' ' + item.value
					}
				} else {
					if (typeof obj.i == 'string') parsed = parsed + ' ' + obj.i
					if (typeof obj.i == 'number') parsed = parsed + ' ' + obj.i
					if (typeof obj.i == 'object') parsed = parsed + ' ' + parseObj(obj.i)
				}
			}
			if (obj.hasOwnProperty('Label') && typeof obj.Label == 'string') {
				parsed = parsed + ' ' + obj.Label
			} 
			
		}
				
		return parsed
	}
}

function md5_ok (file) {

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
	
	const xmlfile = file.replace('.gz','')
	
	return new Promise( async (resolve, reject) => {
		try {
			const input = fs.createReadStream(process.env.pubmed_db_downloads + file)
			const output = fs.createWriteStream(process.env.pubmed_db_xml + xmlfile)
			
			const decode = new Gunzip()
			
			input.pipe(decode).pipe(output)
			output.on('finish', () => resolve(process.env.pubmed_db_xml + xmlfile))			
		} catch (err) {
			reject(err)
		}
	})
}

module.exports.run = main