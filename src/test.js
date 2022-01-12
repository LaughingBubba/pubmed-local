require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(process.env.pubmed_db_mongo_uri, { useUnifiedTopology: true })

const items = [
	{_id: 1, title: 'fruity loops', abstract:'apple', version:'1'},
	{_id: 2, title: 'fruity loops', abstract:'raspberry', version:'1'},
	{_id: 3, title: 'fruity loops', abstract:'cumquat', version:'1'}
]


client.connect( async (err, client) => {
			
	if (err) {
		console.log(err)
	} else {
		const db = client.db(process.env.pubmed_db_mongo_dbname)
		const docs = db.collection(process.env.pubmed_db_mongo_collection)
		
		const bulkUpd = docs.initializeUnorderedBulkOp()
		for (doc of items) {
			bulkUpd.find( {_id: doc._id} ).upsert().replaceOne( doc )
		}
			
		let res = await bulkUpd.execute().catch(err => {
			console.log(yellow(`err: ${err}`))
		})
		
		const bulkDel = docs.initializeUnorderedBulkOp()
		for (doc of items) {
			bulkDel.find( {_id: doc._id} ).deleteOne()
		}
			
		await bulkDel.execute().catch(err => {
			console.log(yellow(`err: ${err}`))
		})
		
		
		client.close()
	}				
})