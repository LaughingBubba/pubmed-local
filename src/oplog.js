require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const solr = require('solr-client')

var solr_client = solr.createClient({host:'pubsolr', core: process.env.pubmed_db_mongo_dbname })

main()

async function main () {
	
	const uri = 'mongodb://root:access@pubmongo:27017' + "/?authSource=admin&readPreference=primary&replicaSet=rs0"
	console.log("using:", uri)

	const client = new MongoClient(uri, { useUnifiedTopology: true })		
	
	client.connect( async (err, client) => {
			
		if (err) {
			console.log(err)
			return
		}
		
		console.log("connection ok")
		
		const db = client.db(process.env.pubmed_db_mongo_dbname)
		
		const collection = db.collection(process.env.pubmed_db_mongo_collection)
		const changeStream = collection.watch()
		
		const solr_errors = db.collection('solr_errors')
		
		loop = true
		do {
			next = await changeStream.next()
			load_solr(next, solr_errors)
		} while (loop)
	})
}

async function load_solr (mongo, solr_errors) {
	
	let obj = {}
	try {
		let res = null
		let apply = false
		obj.id = mongo.documentKey._id
		
		// console.log('operation:', mongo.operationType)
		
		switch (mongo.operationType) {
			case 'delete':
				res = await solr_client.deleteByID(obj.id)	
				apply = true
			break 
				
			case 'update':
				if (mongo.updateDescription.updatedFields.title) {
					obj.title = mongo.updateDescription.updatedFields.title
					apply = true		
				} 
				if (mongo.updateDescription.updatedFields.abstract) {
					obj.abstract = mongo.updateDescription.updatedFields.abstract
					apply = true			
				} 
				if (mongo.updateDescription.updatedFields.version) {
					obj.version = mongo.updateDescription.updatedFields.version
					apply = true		
				} 
				if (apply) res = await solr_client.add(obj)
			break
				 
			case 'replace':
			case 'insert':
				obj.title = null
				obj.abstract = null
				// obj.abstract = (mongo.fullDocument.Article.Abstract.AbstractText) ? mongo.fullDocument.Article.Abstract.AbstractText : ''
				obj.version = (mongo.fullDocument.PMID.Version) ? mongo.fullDocument.PMID.Version : ' '
				
				// Work out title
				if (mongo.fullDocument.Article.ArticleTitle) {
					let t = mongo.fullDocument.Article.ArticleTitle
					if (typeof t == 'object') obj.title = t.value
					if (typeof t == 'string') obj.title = t
				} else {
					obj.title = ' '
				}
				
				// Work out abstract
				if (mongo.fullDocument.Article.Abstract && 
					mongo.fullDocument.Article.Abstract.AbstractText) {
						let a = mongo.fullDocument.Article.Abstract.AbstractText
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
				
				await solr_client.add(obj)
				apply = true
			break
			
			default:
				console.log('mongo doc:', mongo)
		}
		
		if (apply) {
			commit = await solr_client.commit()
			// console.log('Solr response:', JSON.stringify(commit,null,2))
		}
		
	} catch (err) {
		let o = {}
		o.obj = obj
		o.err = err
		solr_errors.insertOne(o)
		// console.log('obj:', obj)
		// console.log('mongo Abstract:', JSON.stringify(mongo.fullDocument.Article,null,2))
		// console.log('err:', err)		
	}
	
}