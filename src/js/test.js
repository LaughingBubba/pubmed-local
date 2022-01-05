const chalk = require('chalk')
const fs = require('fs').promises
const { XMLParser } = require('fast-xml-parser')
const MongoClient = require('mongodb').MongoClient

async function main(xmlfile, cb) {
	
	var message = ''
	var errorApend = ''
	var inserted = 0
	
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
	  message = chalk.blue(`pid: ${chalk.yellow(process.pid)} file: ${chalk.yellow(xmlfile)} inserted: ${chalk.yellow(inserted)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} h:m:s ${errorApend}`)  

	}
	
	start()
	
	const client = new MongoClient(process.env.mongo_uri, { 
		useUnifiedTopology: true, 
		useNewUrlParser: true,
	})
	
	try {
		await client.connect() 
		await client.db('admin').command({ping: 1})
		 
		const db = client.db('pubmed')
		const docs = db.collection('articles')
		
		let bulk = docs.initializeUnorderedBulkOp()
		
		const options = {
			ignoreAttributes : false,
			attributeNamePrefix : "",
			textNodeName: "value",
			allowBooleanAttributes: true
		}
		const parser = new XMLParser(options)
		
		let data = await fs.readFile(process.env.xml + xmlfile)
		
		let jsonObj = parser.parse(data, options)
		
		for (const index in jsonObj.PubmedArticleSet.PubmedArticle) {  
			let doc = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation
			// doc._id = jsonObj.PubmedArticleSet.PubmedArticle[index].MedlineCitation.PMID.value
			doc.PubmedData = jsonObj.PubmedArticleSet.PubmedArticle[index].PubmedData
			doc.xmlfile = xmlfile
			bulk.insert( doc )	
		}
		
		let res = await bulk.execute()
		inserted = res.nInserted	
		await client.close()
		
	}
	catch (err) {
		errorApend = chalk.yellow(`err: ${err})`)
		
	} finally {
		end()	
		cb(null, message)
	
	}

}

module.exports = main