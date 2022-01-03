// This extends books.parse.validate.js by adding in the bulk write 
// of documents to the mongo db.
// Bulk writes are necessary for performance as mongo will handle 
// the buffering and parallelism of the writes.

const chalk = require('chalk')
const assert = require('assert')

// prepare for mongo connection
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://root:access@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const dbName = 'test'
const client = new MongoClient(url, { useUnifiedTopology: true })

function start() {
  startTime = new Date()
  console.log(chalk.black.bgWhiteBright(`Start: ${startTime}`))
}

function end() {
  endTime = new Date()
  var timeDiff = endTime - startTime //in ms
  timeDiff /= 1000

  var seconds = Math.round(timeDiff)
  var minutes = Math.round(seconds / 60, 2)
  console.log(chalk.black.bgWhiteBright(`End: ${endTime} duration ${minutes} mins `))
}

start()
client.connect( async (err, client) => {
  	
  	// assert.strictEqual(null, err)
	if (err) {
		console.log(err)
		return 
	}  
	
  	console.log(chalk.blue('Connected successfully to server'))
	
  	const db = client.db(dbName)
  	console.log(chalk.blue(`Switched to ${db.databaseName} database`))
	  
	const collection = db.collection('test')
	res = await collection.find({}).toArray()
	console.log(res)
	end()
	// console.log(`inserted: ${res.nInserted}`)
	client.close()
	console.log(chalk.blue('Connection closed'))
	
})