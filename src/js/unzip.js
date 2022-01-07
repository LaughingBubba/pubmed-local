require('dotenv').config()
// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
const fs = require('fs')
const chalk = require('chalk')
const {XMLParser} = require('fast-xml-parser')
const sqlite3 = require('sqlite3').verbose()
const Database = require('better-sqlite3')

const Gunzip = require('minizlib').Gunzip

gzipFile = 'pubmed22n0001.xml.gz'
xmlFile = 'pubmed22n0001.xml'

const input = fs.createReadStream(process.env.pubmed_db_test + gzipFile)
const output = fs.createWriteStream(process.env.pubmed_db_test + xmlFile)

const decode = new Gunzip()

input.pipe(decode).pipe(output)