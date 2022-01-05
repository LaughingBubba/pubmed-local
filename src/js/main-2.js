import { Pool } from 'node-multiprocess'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// import chalk from 'chalk'
dotenv.config()
// import { MongoClient } from 'mongodb'
import worker from './test3.js'

async function main () {
	const pool = new Pool(4)
	
	// function worker (x) {
	// 	// return new Promise( (resolve, reject) => {
	// 		console.log('running process:', process.pid)
	// 		// return x * x
	// 		// console.log('running process:', process.getuid())
	// 		return x * x
	// 		// resolve(x * x)	
	// 	// })
	// }
	
	const workQ = []
	for (let i = 1; i < 6; i++) {
		// const res = pool.addJob(__dirname + '/test2.js', i)
		const res = pool.addJob(worker, i)
		workQ.push(res)
	}
	
	const results = await Promise.all(workQ)
	results.forEach(result => console.log(result))
	pool.kill()	
}

main()