// const chalk = require('chalk')
// const MongoClient = require('mongodb').MongoClient

import {MongoClient} from 'mongodb'
import chalk from 'chalk'

function main(x) {
	
	function start() {
	  var startTime = new Date()
	  // console.log(chalk.black.bgWhiteBright(`Start: ${startTime}`))
	}
	
	function end() {
	  var endTime = new Date()
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
	  console.log(chalk.blue(`file: ${chalk.yellow(x)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} h:m:s`))
	}
	
	(async () => {
		await getmongo()
	})()
	
	async function getmongo(x) {
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
	}
}

export default main