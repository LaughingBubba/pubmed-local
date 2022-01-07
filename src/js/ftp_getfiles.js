require('dotenv').config()
const fs = require('fs')
const yellow = require('chalk').yellow
const blue = require('chalk').blue
const green = require('chalk').green
const ftp = require("basic-ftp")
const Database = require('better-sqlite3')

const BASE = 'BASE'
const UPDATE = 'UPDATE' 

main()

async function main () {
	
	var args = process.argv.slice(2)

	if (args.length == 0) {
		console.log("pubtype value not supplied. requires: BASE or UPDATE")
	} else {
		pubtype = args[0].toUpperCase()
		if (pubtype != BASE && pubtype != UPDATE) {
			console.log("pubtype value must be BASE or UPDATE")
		} else {
			ftp_files(pubtype)
		}
	}
}

async function ftp_files (pubtype) {
	
	// Setup DB 
	const db = new Database(process.env.pubmed_db_test + 'pubmed.ftp.sqlite', { /* verbose: console.log */ })
	
	let keep_going = await check_loop(db, pubtype)
	
	// Loop while you can
	while (keep_going) {
		
		pending = await get_pending(db, pubtype)
		
		if (pending.length > 0) {
			const download_dir = (pubtype === UPDATE) ? process.env.pubmed_db_ftp_updates : process.env.pubmed_db_ftp_base
			const db = new Database(process.env.pubmed_db_test + 'pubmed.ftp.sqlite', { /* verbose: console.log */ })
			const client = new ftp.Client()
			client.ftp.verbose = true
			try {
				await client.access({
					host: process.env.pubmed_db_ftp_host,
					user: process.env.pubmed_db_ftp_user,
					password: process.env.pubmed_db_ftp_password,
					secure: false
				})
				await client.cd(download_dir)
				for (item of pending) {
					ftp_getfile(client, db, pubtype, item.name, item.size)
				}
			} catch (err) {
				console.log(file_name, ":", err)
			} finally {
				client.trackProgress()
				client.close()
				db.close()	
			}
		}

				
		// mismatch = get_mismatch(db, pubtype)
		// for (item of mismatch) {
		// 	// utils.ftp_getfile(config, conn, item[0], item[1])
		// }
		
		keep_going = await check_loop(db, pubtype)
		if (keep_going) {
			console.log(green.bold('Sleeping for 5 mins'))
			await sleep(30000)
		}		
	}
	
	console.log(green.bold('No more items pending or with size issues'))	
	db.close()
}

async function ftp_getfile (client, db, pubtype, file_name, size) {
		
	// const download_dir = (pubtype === UPDATE) ? process.env.pubmed_db_ftp_updates : process.env.pubmed_db_ftp_base
	
	const path = process.env.pubmed_db_test + 'downloads/' + file_name
	
	if (fs.existsSync(path)) {
		fs.unlinkSync(path)
	}

	// const client = new ftp.Client()
	// client.ftp.verbose = false
	// try {
	// 	await client.access({
	// 		host: process.env.pubmed_db_ftp_host,
	// 		user: process.env.pubmed_db_ftp_user,
	// 		password: process.env.pubmed_db_ftp_password,
	// 		secure: false
	// 	})
	// 	
	// 	const db = new Database(process.env.pubmed_db_test + 'pubmed.ftp.sqlite', { /* verbose: console.log */ })
		// let size = 0
		// await client.cd(download_dir)
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", file_name)		
		// Log progress for any transfer from now on.
		client.trackProgress(info => {
			console.log("Progress: File", info.name, "Type", info.type, "Transferred", info.bytes, "Transferred Overall", info.bytesOverall)
		})
		
		await client.downloadTo(path, file_name)
		// 
		// print(host_file + ": " + sts, err)
		// rtv = Date.now()
		// sts = sts
		dl_size = 0
		if (fs.existsSync(path)) {
			fs.stat(path, (err, stats) => {
				dl_size = stats.size	
			})
		}
			
		// sql = `
		// 	UPDATE pubmed_ftp
		// 	set retrieved="{rtv}", sts="{sts}", err="{err}", size_dl={size_dl}
		// 	WHERE name="{name}" and host_dir="{host_dir}"
		// `.format(name=host_file, host_dir=host_dir, rtv=rtv, sts=sts, err=err, size_dl=size_dl)
		
		// db.close()
		console.log(blue(`Downloaded ${yellow(file_name)} type ${yellow(pubtype)} file size ${size} dl size ${dl_size}`))
	// }
	// catch(err) {
	// 	console.log(file_name, ":", err)
	// }
	// client.trackProgress()
	// client.close()	
}

async function check_loop (db, pubtype) {
	pending = await get_pending(db, pubtype)
	mismatch = await get_mismatch(db, pubtype)
	console.log(yellow.bold(mismatch.length), 
				green.bold('items with size issues and'), 
				yellow.bold(pending.length), green.bold('items pending'))
	return (mismatch.length > 0 || pending.length > 0) ? true : false
}

async function get_mismatch (db, pubtype) {
	let sql = `	
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype='${pubtype}' 
		  and name not in('.','..')
		  and size_dl is NOT NULL 
		  and size <> size_dl
		ORDER BY name;
	`
	return db.prepare(sql).all()
}

async function get_pending (db, pubtype) {
	let sql = `	
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype='${pubtype}' 
		  and name not in('.','..')
		  and size_dl is NULL
		ORDER BY name;
	`
	return db.prepare(sql).all()
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}