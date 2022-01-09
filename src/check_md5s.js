require('dotenv').config()
const fs = require('fs')
const crypto = require('crypto')
const Database = require('better-sqlite3')
const yellow = require('chalk').yellow
const blue = require('chalk').blue

// main()

async function main () {
	return new Promise( async (resolve, reject) => {
		console.log(blue(`Checking md5s`))
		let md5_fails = []
			
		const db = new Database(process.env.pubmed_db_control_db, { /* verbose: console.log */ })
		let sql = `	
			SELECT name
			FROM pubmed_ftp
			WHERE name like '%gz'
		  	and sts = 'NEW'
			ORDER BY name
		`
		const rows = db.prepare(sql).all()
		
		for (const row of rows) {
			const file_name = process.env.pubmed_db_downloads + row.name
			try {
				if (fs.existsSync(file_name)) {
					if (fs.existsSync(file_name + '.md5')) {
						// If md5 check fails delete the file and let FTP mirror resync
						const res = await md5_ok(file_name)
						if (!res) {
							fs.unlinkSync(file_name)
							fs.unlinkSync(file_name + '.md5')
							md5_fails.push(file_name)
							console.log(blue(`md5 check failed for ${yellow(file_name)}`))
						}  		
					} else {
						md5_fails.push(file_name)
						console.log(blue(`file not found ${yellow(file_name)}`))							
					}
				} else {
					md5_fails.push(file_name)
					console.log(blue(`file not found ${yellow(file_name)}`))					
				}
			} catch (err) {
				reject(err)	
			}
		}
		db.close()
		resolve(md5_fails)
		console.log(blue(`${yellow(md5_fails.length)} md5 failures`))
	})	
}

function md5_ok (gzip_file) {

	return new Promise( async (resolve, reject) => {
		try {
			md5_file  = gzip_file + '.md5'
			
			const buff = fs.readFileSync(md5_file, 'UTF-8')
			const expectedMD5 = buff.split("=")[1].trim()
			
			const buff2 = fs.readFileSync(gzip_file)
			const hashSum = crypto.createHash('md5').update(buff2)
			const actualMD5 = hashSum.digest('hex')		
			resolve((expectedMD5===actualMD5))	
		} catch (err) {
			reject(err)
		}
	})
}

module.exports.run = main