const init_dbs = require('./src/init_dbs.js')
const ftp_files = require('./src/ftp_files.js')
const check_md5s = require('./src/check_md5s.js')
const load = require('./src/load.js')

main()

async function main() {
	try {
		await init_dbs.run()
		do {
			await ftp_files.run()
			var md5_fails = await check_md5s.run()
		} while (md5_fails > 0)
		await load.run()		
	} catch (err) {
		console.log(err)	
	}
}
// Loading start: Sat Jan 08 2022 23:44:25 GMT+1100 (Australian Eastern Daylight Time)