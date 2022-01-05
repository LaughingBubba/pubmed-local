require('dotenv').config()
const chalk = require('chalk')

const Pool = require('multiprocessing').Pool

const pool = new Pool(4)

const workQ = []
for (let i = 1; i < 6; i++) {
	workQ.push(i)
}

console.log(chalk.blue.bold('Running file loads ...'))

let result = []

pool.map(workQ, __dirname + '/test')

pool.close()