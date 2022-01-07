# pubmed-db

Reliably download pubmed baseline and updates from the NCBI FTP server. 

Every file is checked to ensure the downloaded size of the file matches the size on the FTP server. You can optionally check the md5 hash of the files downloaded.  

### NOTE
Written using Python 3.10.1

## Installation and Execution 
- Clone this repo
- Change directories 
- Rename the example `config.cnf` to `pubmed-db.cnf`
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

## Solr
https://solr.apache.org/
https://hub.docker.com/_/solr


## FTP Vagaries
https://docs.python.org/3/library/ftplib.html#   

### Passive/Active Mode
https://titanftp.com/2018/08/23/what-is-the-difference-between-active-and-passive-ftp/   
https://www.jscape.com/blog/bid/80512/active-v-s-passive-ftp-simplified   

### Examples of note
https://github.com/keepitsimple/pyFTPclient/blob/master/pyftpclient.py   

## Async / Sockets FTP
https://pypi.org/project/aioftp/   
https://aioftp.readthedocs.io/client_api.html   
https://aioftp.readthedocs.io/client_tutorial.html   

https://pypi.org/project/parfive/   

## UNZIP Node
https://javascript.plainenglish.io/node-js-unzip-async-await-901040d30393  

## FTP

### Node
https://github.com/patrickjuchli/basic-ftp   
https://github.com/mscdex/node-ftp   
https://github.com/sergi/jsftp   

## Multiprocessing

### Node
https://stackoverflow.com/questions/47997812/python-multiprocessing-in-node-js   
https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node   
https://www.npmjs.com/package/multiprocessing   
https://github.com/scottjr632/node-multiprocessing  
https://blog.logrocket.com/a-complete-guide-to-threads-in-node-js-4fa3898fe74f/  
https://medium.com/tech-tajawal/clustering-in-nodejs-utilizing-multiple-processor-cores-75d78aeb0f4f  
https://alvinlal.netlify.app/blog/single-thread-vs-child-process-vs-worker-threads-vs-cluster-in-nodejs   
https://sodocumentation.net/node-js/topic/10592/multithreading   
https://medium.com/@mohllal/node-js-multithreading-a5cd74958a67   

https://nodejs.org/en/docs/guides/dont-block-the-event-loop/   
https://www.youtube.com/watch?v=P9csgxBgaZ8   
	

https://www.npmjs.com/package/worker-farm   
https://www.npmjs.com/package/piscina   

https://www.npmjs.com/package/arraybuffer-xml-parser

### Python
https://stackoverflow.com/questions/20887555/dead-simple-example-of-using-multiprocessing-queue-pool-and-locking   
https://www.journaldev.com/15631/python-multiprocessing-example   
https://docs.python.org/3/library/multiprocessing.html   