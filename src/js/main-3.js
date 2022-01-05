require('dotenv').config()
const Database = require('better-sqlite3')

var workerFarm = require('worker-farm')
  , workers    = workerFarm({maxConcurrentWorkers: 2}, require.resolve('./test'))
  , ret        = 0


console.log(chalk.black.bgWhiteBright(`Start: ${startTime}`))
const pubtype = 'BASE'
var files = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n']

// for (var i = 0; i < 20; i++) {
//   workers('#' + i + ' FOO', function (err, outp) {
// 	console.log(outp)
// 	if (++ret == 10)
// 	  workerFarm.end(workers)
//   })
// }

	
const db = new Database(process.env.control_db, { verbose: console.log })

let sql = `	
	SELECT trim(name, '.gz') as name
	FROM pubmed_ftp
	WHERE pubtype = '${pubtype}'
	  and name like '%.gz'
	  and size = size_dl
	ORDER BY name
`

const res = db.prepare(sql)

for (const xmlfile of res.iterate()) {
  workers(xmlfile.name, function (err, outp) {
	console.log(outp)
	if (++ret == 10)
	  workerFarm.end(workers)
  })
}	