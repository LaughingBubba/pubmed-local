require('dotenv').config()
const yellow = require('chalk').yellow
const blue = require('chalk').blue
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
			db_init()
			ftp_init(pubtype)
		}
	}
}

async function ftp_init (pubtype) {

	const download_dir = (pubtype === UPDATE) ? process.env.pubmed_db_ftp_updates : process.env.pubmed_db_ftp_base
	const client = new ftp.Client()
	client.ftp.verbose = false
	try {
		await client.access({
			host: process.env.pubmed_db_ftp_host,
			user: process.env.pubmed_db_ftp_user,
			password: process.env.pubmed_db_ftp_password,
			secure: false
		})
		
		const db = new Database(process.env.pubmed_db_test + 'pubmed.ftp.sqlite', { /* verbose: console.log */ })
		let size = 0
		await client.cd(download_dir)
		const contents = await client.list()
		for (let item of contents) {
			size = size + item.size
			if (item.type === 1) update_control(db, pubtype, download_dir, item.name, item.size)
		}
		db.close()
		console.log(blue(`Total ${yellow(pubtype)} files size`), yellow((size/1073741824).toFixed(2)), blue('GB'))
	}
	catch(err) {
		console.log(err)
	}
	client.close()
}

function update_control  (db, pubtype, download_dir, file_name, size) {
	let sql = `	
		INSERT OR IGNORE INTO pubmed_ftp
			(name, host_dir, pubtype, size) 
  		VALUES('${file_name}', '${download_dir}', '${pubtype}', ${size});
	`
	const res = db.prepare(sql).run()	
}

async function db_init () {
	
	const db = new Database(process.env.pubmed_db_test + 'pubmed.ftp.sqlite', { /* verbose: console.log */ })
	let sql = `	
		CREATE TABLE IF NOT EXISTS pubmed_ftp (
		  name TEXT,
		  host_dir TEXT,
		  size INT,
			size_dl INT,
		  retrieved TEXT,
		  validated TEXT,
		  loaded TEXT,
		  pubtype TEXT,
			sts TEXT,
			err TEXT,
		  xmlBlob BLOB,
		  PRIMARY KEY (host_dir, name)
		);
	`
	const res = db.prepare(sql).run()	
	db.close()
}