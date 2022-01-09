# pubmed-db

Reliably download pubmed baseline and updates from the NCBI FTP server. 

Every file is checked to ensure the downloaded size of the file matches the size on the FTP server. You can optionally check the md5 hash of the files downloaded.  

### NOTE
Written using Node v17.3.0

## Installation and Execution 
- Clone this repo
- Change directories to you local version of this repo
- Rename the example `.env.example` to `.env`
- Update config as required. NOTE: The NCBI docs state that you should your use your email address as the password. 
- Initialise the BASE and UPDATE list of files to FTP   
`python ftp_init.py base`   
`python ftp_init.py update`   
- Then run the scripts to get the files (you can run them in separate terminals simultaneously)   
`python ftp_getfiles.py base`      
`python ftp_getfiles.py update`
- When they've run to completion you check the md5 hashes   
`python check_md5.py base`   
`python check_md5.py update` 

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

## Mogo-Solr Sync
https://topic.alibabacloud.com/a/solr-integrates-with-mongodb-real-time-incremental-indexing-__java_1_45_20255015.html   
https://blog.toadworld.com/2017/02/03/indexing-mongodb-data-in-apache-solr   
https://itnext.io/apache-solr-because-your-database-is-not-a-search-engine-57705352df8a   
https://github.com/yougov/mongo-connector/wiki/Usage%20with%20Solr  

## Solr
https://solr.apache.org/   
https://hub.docker.com/_/solr   
https://blog.toadworld.com/2017/02/03/indexing-mongodb-data-in-apache-solr   

https://www.npmjs.com/package/solr-client   
https://github.com/lbdremy/solr-node-client#readme   

https://dev.to/sntnupl/how-to-setup-a-mongodb-replica-set-for-development-using-docker-1de   
https://zgadzaj.com/development/docker/docker-compose/turning-standalone-mongodb-server-into-a-replica-set-with-docker-compose   
https://stackoverflow.com/questions/61486024/mongo-container-with-a-replica-set-with-only-one-node-in-docker-compose   

