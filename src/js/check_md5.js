require('dotenv').config()
// pubmed22n0001.xml Start: Sun Jan 02 2022 23:53:19
const fs = require('fs')
const chalk = require('chalk')
var crypto = require('crypto')

const Gunzip = require('minizlib').Gunzip

md5File  = 'pubmed22n0002.xml.gz.md5'
gzipFile = 'pubmed22n0001.xml.gz'
xmlFile = 'pubmed22n0001.xml'

const buff = fs.readFileSync(process.env.pubmed_db_test + md5File, 'UTF-8')
const expectedMD5 = buff.split("=")[1].trim()

const buff2 = fs.readFileSync(process.env.pubmed_db_test + gzipFile)
const hashSum = crypto.createHash('md5').update(buff2)
const actualMD5 = hashSum.digest('hex')

console.log(actualMD5)

console.log("Hashes", (expectedMD5===actualMD5) ? "match" : "do not match")