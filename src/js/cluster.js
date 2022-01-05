import cluster from 'cluster'
import chalk from 'chalk'
import { MongoClient } from 'mongodb'
import os from 'os'

let workers = []

const setupWorkerProcesses = () => {
	// to read number of cores on system
	// to read number of cores on system
	let numCores = os.cpus().length
	console.log('Master cluster setting up ' + (--numCores) + ' workers')

	// iterate on number of cores need to be utilized by an application
	// current example will utilize all of them
	// leave 1 spare
	for(let i = 0; i < numCores; i++) {
		// creating workers and pushing reference in an array
		// these references can be used to receive messages from workers
		workers.push(cluster.fork())

		// to receive messages from worker process
		workers[i].on('message', (message) => {
			console.log(message)
		});
	}

	// process is clustered on a core and process id is assigned
	cluster.on('online', (worker) => {
		console.log('Worker ' + worker.process.pid + ' is listening')
	})

	// if any of the worker process dies then start a new one by simply forking another one
	cluster.on('exit', (worker, code, signal) => {
		console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
		console.log('Starting a new worker')
		cluster.fork()
		workers.push(cluster.fork())
		
		// to receive messages from worker process
		workers[workers.length-1].on('message', (message) => {
			console.log(message)
		})
	})
}

function testMongo() {
	const url = 'mongodb://root:access@localhost:27017'
	const dbName = 'test'
	
	const client = new MongoClient(url, { useUnifiedTopology: true })
	client.connect( async (err, client) => {
		  
		  // assert.strictEqual(null, err)
		if (err) {
			console.log(err)
			return 
		}  
		
		// console.log(chalk.blue('Connected successfully to server'))
		console.log('Connected successfully to server')
		const db = client.db(dbName)
		// console.log(chalk.blue(`Switched to ${db.databaseName} database`))
		console.log(`Switched to ${db.databaseName} database`)
		  
		const collection = db.collection('test')
		const res = await collection.find({}).toArray()
		console.log(res)
		
		// console.log(`inserted: ${res.nInserted}`)
		client.close()
		// console.log(chalk.blue('Connection closed'))
		console.log('Connection closed')
		
	})	
}

const main = () => {

	// if it is a master process then call setting up worker process
	if(cluster.isMaster) {
		setupWorkerProcesses()
	} else {
		// Otherwise run the worker process
		testMongo()
	}
}

main()