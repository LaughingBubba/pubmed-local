require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

main()

async function main () {

	const uri = `mongodb://root:access@pubmongo:27017` + '/?authSource=admin&readPreference=primary&replicaSet=rs0'
	console.log("using:", uri)

	const client = new MongoClient(uri, { useUnifiedTopology: true })		
		client.connect( async (err, client) => {
			
		if (err) {
			console.log(err)
			return
		}
		
		console.log("connection ok")
		
		const db = client.db('test' /*process.env.pubmed_db_mongo_dbname*/)
		
		const collection = db.collection('test')
		const changeStream = collection.watch()
		
		loop = true
		do {
			next = await changeStream.next()
			console.log(next)
		} while (loop)
	})
}