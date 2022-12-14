const init_dbs = require('./src/init_dbs.js')
const ftp_files = require('./src/ftp_files.js')
const check_md5s = require('./src/check_md5s.js')
const load = require('./src/load.js')

main()

async function main() {
	
	var no_load = false
	var args = process.argv.slice(2)
	
	if (args.length >= 2 && args[1].toUpperCase() == 'NOLOAD') {
		no_load = true
	} 
	
	try {
		await init_dbs.run()
		do {
			await ftp_files.run()
			var md5_fails = await check_md5s.run()
		} while (md5_fails > 0)
		if (!no_load) await load.run()		
	} catch (err) {
		console.log(err)	
	}
}