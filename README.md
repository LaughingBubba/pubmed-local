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

## Solr
https://solr.apache.org/
https://hub.docker.com/_/solr
