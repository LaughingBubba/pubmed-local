// This extends books.parse.validate.js by adding in the bulk write 
// of documents to the mongo db.
// Bulk writes are necessary for performance as mongo will handle 
// the buffering and parallelism of the writes.

// import chalk from 'chalk'

// prepare for mongo connection
// const MongoClient = require('mongodb').MongoClient
import { MongoClient } from 'mongodb'

function test3(x) {
	
	console.log(process.pid, process.env.mongo_uri)

	// (async () => {
	// 	await getmongo()
	// })()
	
	(async function () {
	
		const MongoClient = await import('mongodb').MongoClient()
		
		start()		
		
		const client = new MongoClient(process.env.mongo_uri, { useUnifiedTopology: true })
		
		try {
			await client.connect() 
			// await client.db('admin').command({ping: 1}) 
			// const db = await client.db('test')
			// 
			// 
			// const collection = db.collection('test')
			// res = await collection.find({}).toArray()
			// console.log(res)
			// console.log(`inserted: ${res.nInserted}`)
			await client.close()	
		}
		catch (err) {
			console.log(chalk.yellow(`pid: ${process.pid} file: ${x} err: ${err})`))
		} finally {
			end()
		}	
	 })()
	
	return process.pid
	// const client = new MongoClient(process.env.mongo_uri, { useUnifiedTopology: true })
	// client.connect( async (err, client) => {
	//   	
	//   	// assert.strictEqual(null, err)
	// 	if (err) {
	// 		console.log(err)
	// 		return 
	// 	}  
	// 	
	//   	// console.log(chalk.blue('Connected successfully to server'))
	// 	onsole.log('Connected successfully to server')
	//   	const db = client.db('test')
	//   	// console.log(chalk.blue(`Switched to ${db.databaseName} database`))
	// 	console.log(`Switched to ${db.databaseName} database`)
	//   	
	// 	const collection = db.collection('test')
	// 	const res = await collection.find({}).toArray()
	// 	console.log(res)
	// 	
	// 	// console.log(`inserted: ${res.nInserted}`)
	// 	client.close()
	// 	// console.log(chalk.blue('Connection closed'))
	// 	console.log('Connection closed')
	// 	
	// })	

	async function getmongo(x) {
		start()
		
		const MongoClient = await import('mongodb').MongoClient()
		const client = new MongoClient(process.env.mongo_uri, { useUnifiedTopology: true })
		
		try {
			await client.connect() 
			// await client.db('admin').command({ping: 1}) 
			// const db = await client.db('test')
			// 
			// 
			// const collection = db.collection('test')
			// res = await collection.find({}).toArray()
			// console.log(res)
			// console.log(`inserted: ${res.nInserted}`)
			await client.close()	
		}
		catch (err) {
			console.log(chalk.yellow(`pid: ${process.pid} file: ${x} err: ${err})`))
		} finally {
			end()
		}		
	}
}

export default test3