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

## PUBMED Architecture

## Mongo OpLog
https://www.npmjs.com/package/mongo-oplog   

## Mongo Docker single node replica set
https://dev.to/sntnupl/how-to-setup-a-mongodb-replica-set-for-development-using-docker-1de   
https://stackoverflow.com/questions/61486024/mongo-container-with-a-replica-set-with-only-one-node-in-docker-compose   
https://gist.github.com/asoorm/7822cc742831639c93affd734e97ce4f   
https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose   


## Mongo-Solr Sync
https://topic.alibabacloud.com/a/solr-integrates-with-mongodb-real-time-incremental-indexing-__java_1_45_20255015.html   
https://blog.toadworld.com/2017/02/03/indexing-mongodb-data-in-apache-solr   
https://itnext.io/apache-solr-because-your-database-is-not-a-search-engine-57705352df8a   
https://github.com/yougov/mongo-connector/wiki/Usage%20with%20Solr   
https://stackoverflow.com/questions/47309467/solr-with-mongodb-connection   
https://stackoverflow.com/questions/61486024/mongo-container-with-a-replica-set-with-only-one-node-in-docker-compose   

## Solr
https://solr.apache.org/   
https://hub.docker.com/_/solr   
https://blog.toadworld.com/2017/02/03/indexing-mongodb-data-in-apache-solr   
https://github.com/docker-solr/docker-solr/blob/master/README.md   

https://www.npmjs.com/package/solr-client   
https://github.com/lbdremy/solr-node-client#readme   

https://dev.to/sntnupl/how-to-setup-a-mongodb-replica-set-for-development-using-docker-1de   
https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose   
https://stackoverflow.com/questions/61486024/mongo-container-with-a-replica-set-with-only-one-node-in-docker-compose   

## FTP
https://www.npmjs.com/package/ftps    
https://lftp.yar.ru/    
