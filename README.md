# pubmed-db

Reliably download pubmed baseline and updates from the NCBI FTP server and load to MongoDB.

Every file's md5 is checked to ensure they have downloaded correctly. Failures will trigger re-mirroring of the affected files and their md5's.

### NOTE
Written using Node v17.3.0

## Installation and Execution 

Assumptions:
- Running on M1 platform (if not, change `pubmed_db_docker_platform` value in `.env` to `linux/amd64`)
- Docker Engine is already installed

Steps:
- Install node   
`brew update && brew install node`
- Install lftp (required by node-ftps npm package)   
`brew install lftp`
- Clone this repo
- Change directory to your local version of this repo   
`cd ./pubmed-db`
- Rename the example `.env.example` to `.env`
- Update `.env` as required. NOTE: The NCBI docs state that you should your use your email address as the password.
- Install NPM packages   
`npm install`
- Initialise FTP mirroring BASE and UPDATE files and load when complete:   
`node run init` 
- To mirror and load subsequent updates:   
`node run update` 

## Observations
- Changing FTP mode to active (instead of passive) has greatly increased reliability of the connection and subsequent down downloads
- HOWEVER: Many files have local file sizes that don't match the listed size on the FTP server. When using PSAV the mismatch file sizes would often be multiples of the base size.
- The most number of consecutive successful downloads with PASV was ~100, usually less.
- The majority of the last 3 to 4 hundred xml files contain duplicates.

## Installing Latest Python Locally for Mac

https://opensource.com/article/19/5/python-3-default-mac

### Then mess around with
https://github.com/pyenv/pyenv  
https://medium.com/geekculture/setting-up-python-environment-in-macos-using-pyenv-and-pipenv-116293da8e72
NOTE: check .zshrc or .bashrc for pyenv shims PATH export 

## Solr
https://solr.apache.org/   
https://hub.docker.com/_/solr   
https://blog.toadworld.com/2017/02/03/indexing-mongodb-data-in-apache-solr   
https://github.com/docker-solr/docker-solr/blob/master/README.md   

https://www.npmjs.com/package/solr-client   
https://github.com/lbdremy/solr-node-client#readme     

https://yonik.com/solr-tutorial/   
https://yonik.com/solr/query-syntax/   

## Commands
Delete all items:
{'delete': {'query': '*:*'}}

List only fields in the cores schema:   
`curl http://localhost:8983/solr/pubmed/schema/fields`

List the core's schema:   
`curl http://localhost:8983/solr/pubmed/schema`   
`curl http://localhost:8983/solr/pubmed/schema?wt=schema.xml`   

Update schema:   
`curl -X POST -H 'Content-type:application/json' --data-binary '{
  "add-field": [
  {
	"name": "title",
	"type": "text_general"
	"indexed": true,
	"required": true,
  },
  {
	"name": "abstract",
	"type": "text_general"
	"indexed": true,
	"required": true,
  },
  {
	"name": "version",
	"type": "string",
	"indexed": false,
	"required": true,
  }]
}' http://localhost:8983/solr/pubmed/schema`

curl http://localhost:8983/solr/pubmed/query -d '
{
  "query": "*:*",
  "facet": {
	"categories" : {
	  "type": "terms",
	  "field": "xmlfile",
	  "limit": 2000
	}
  }
}'


curl http://localhost:8983/solr/pubmed/query -d '
{
  "query": "*:*",
  "facet": {
	"categories" : {
	  "type": "terms",
	  "field": "xmlfile"
	}
  }
}'
## FTP
https://www.npmjs.com/package/ftps    
https://lftp.yar.ru/    
