# pubmed-db

Create your own working copy of pubmed targeting any of these databases:

- MongoDB
- MariaDB
- MySQL

## Observations
- Changing FTP mode active (instead of passive) has greatly increased reliability of the connection and subsequent down downloads
- HOWEVER: Many files have local file sizes that don't match the listed size on the FTP server. When using PSAV the mismatch file sizes would often be multiples of the base size.
- The most number of consecutive successful downloads with PASV was ~100, usually less.

## Configuration

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Installing Latest Python Locally

https://opensource.com/article/19/5/python-3-default-mac  
https://www.python.org/downloads/   

### Then fuck around with
https://github.com/pyenv/pyenv  
https://medium.com/geekculture/setting-up-python-environment-in-macos-using-pyenv-and-pipenv-116293da8e72
 
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