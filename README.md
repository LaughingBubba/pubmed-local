# pubmed-local (PML)

Download and sync pubmed to your M1 Mac Mini.

Reliably download pubmed baseline and updates from the NCBI FTP server then load to MongoDB and Solr (for advanced text search).

## FTP 

Every file's md5 is checked to ensure they have downloaded correctly. Failures will trigger re-mirroring of the affected files and their md5's.

## Installation and Execution 

Assumptions:
- Running on M1 platform 
- Docker Engine is already installed

Steps:
- Download the `pml` binary to a directory of your choice ie: `/Users/yourname/pubmed` NOTE: This will be used as the `pubmed-local` directory
- If you haven't already change directory to where the binary is eg:   
`cd /Users/yourname/pubmed`   
- Run PML setup command:      
`pml setup`
- Follow the prompts

NOTE: The NCBI docs state that you should your use your email address as the password. Please update this in the .env file. Do the right thing.

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
