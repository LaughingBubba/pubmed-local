# pubmed-db

Reliably download pubmed baseline and updates from the NCBI FTP server. 

Every file is checked to ensure the downloaded size of the file matches the size on the FTP server. You can optionally check the md5 hash of the files downloaded.  

## NOTE
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

## Installing Latest Python Locally for Mac

https://opensource.com/article/19/5/python-3-default-mac

### Then mess around with
https://github.com/pyenv/pyenv  
https://medium.com/geekculture/setting-up-python-environment-in-macos-using-pyenv-and-pipenv-116293da8e72
NOTE: check .zshrc or .bashrc for pyenv shims PATH export 

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