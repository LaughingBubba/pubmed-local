require('dotenv').config()
const fs = require('fs')
const Database = require('better-sqlite3')
const yellow = require('chalk').yellow
const blue = require('chalk').blue
const green = require('chalk').green

const BASE = 'BASE'
const UPDATE = 'UPDATE' 
const INIT = 'INIT' 

// main()

function main () {
	
	return new Promise( async (resolve, reject) => {
		try {
			
			var pubtype = ''
			var args = process.argv.slice(2)
			
			if (args.length == 0) {
				var pubtype = INIT
				console.log("pubtype value not supplied. defaulted to INIT")
			} else {
				pubtype = args[0].toUpperCase()
			}
			
			if (pubtype != BASE && pubtype != UPDATE && pubtype != INIT) {
				console.log("pubtype value must be BASE, UPDATE or INIT")
				
			} else {
				if (pubtype == INIT) {
					await run(BASE)
					await run(UPDATE)
				} else {
					await run(pubtype)
				}
				resolve()
			}	
		} catch (err) {
			reject(err)	
		}
	})	
}

function run (pubtype) {
	return new Promise( async (resolve, reject) => {
		start(pubtype)
		var FTPS = require('ftps')
		var ftps = new FTPS({
	  	host: process.env.pubmed_db_ftp_host, 
	  	username: process.env.pubmed_db_ftp_user, 
	  	password: process.env.pubmed_db_ftp_password, 
	  	protocol: 'ftp', 
	  	retries: 3, 
	  	timeout: 10, 
	  	retryInterval: 5, 
	  	retryMultiplier: 1, 
	  	additionalLftpCommands: 'set ftp:passive-mode false', 
		})
		ftps.mirror({
	  	remoteDir: (pubtype === UPDATE) ? process.env.pubmed_db_ftp_updates : process.env.pubmed_db_ftp_base, 
	  	localDir: process.env.pubmed_db_downloads, 
	  	parallel: 3, 
	  	upload: false, 
		}).exec((err, res) => {
			if (err) {
				reject(err)	
			} else {
				if (res.error != null) {
					reject(res.error)
				} else {
					update_control(pubtype)
					end(pubtype, res.data) 
					resolve()
				}
			}
		})
	})
}

function update_control (pubtype) {
	const dirTree = require("directory-tree")
	const db = new Database(process.env.pubmed_db_control_db, { /* verbose: console.log */ })
	
	const tree = dirTree(process.env.pubmed_db_downloads, {
		attributes:['type', 'size'],
		extensions: /\.(gz|md5)$/
	})
	for (item of tree.children) {
		if (typeof item.type == 'undefined' || item.type == 'file') {
			let sql = `
				INSERT OR IGNORE INTO pubmed_ftp
					(name, pubtype, size, sts) 
			  	VALUES('${item.name}', '${pubtype}', ${item.size}, 'NEW');
			`
			const res = db.prepare(sql).run()		
		}	
	}
	db.close()
}

function start(pubtype) {
	startTime = new Date()
	console.log(blue(`FTP mirroring for ${yellow(pubtype)} mode`))
}

function end(pubtype, append) {
	endTime = new Date()
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
	// console.log(chalk.blue(`file: ${chalk.yellow(x)} duration ${chalk.yellow(`${hh}:${mm}:${ss}`)} h:m:s`))
	message = blue(`FTP mirroring for ${yellow(pubtype)} done. Duration ${yellow(`${hh}:${mm}:${ss}`)} hh:mm:ss ${append}`)
	console.log(message)
}

module.exports.run = main