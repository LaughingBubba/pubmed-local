# import fnmatch
import os, io, fnmatch
import sqlite3
import hashlib
import gzip, shutil
import configparser

from ftplib import FTP
from functools import partial
from datetime import datetime

## INITIALISE DB Connection
def init_db(conn):

  c = conn.cursor()

  # Create ftp files table
  c.execute(
    '''
    CREATE TABLE IF NOT EXISTS pubmed_ftp (
      name TEXT,
      host_dir TEXT,
      size INT,
      retrieved TEXT,
      validated TEXT,
      loaded TEXT,
      pubtype TEXT,
      xmlBlob BLOB,
      PRIMARY KEY (host_dir, name)
    );
    ''')

## CHECK FOR FILES
def chk_pubmed(host, host_dir, pubtype, conn):
  print('>>> CHECKING ' + pubtype  + ' FILES <<<')

  c = conn.cursor()
  ftp = FTP(host)
  ftp.set_pasv(False)
  
  ftp.login(user='anonymous', passwd='hb@dnaiq.com')
  ftp.cwd(host_dir)

  size = 0
  for name, facts in ftp.mlsd():
    print ("name " + name + " size " + facts["size"])
    file_size = int(facts["size"])
    size += int(facts["size"])
    sql = '''
      INSERT OR REPLACE INTO pubmed_ftp
        (name, host_dir, pubtype, size) 
      VALUES("{name}", "{host_dir}", "{pubtype}", {size});
    '''.format(name=name,host_dir=host_dir,pubtype=pubtype,size=file_size) 
    c.execute(sql)      
    conn.commit()   

  ftp.quit()
  c.close()
  print('>>> Total GB size is ' + str(size/1073741824))

  return

## GET / DOWNLOAD
def get_pubmed(host, host_dir, local_dir, pubtype, conn):
  print('>>> GETTING BASE FILES <<<')
  
  # list the pubtype files to get
  c = conn.cursor()
  u = conn.cursor()
  sql = '''
    SELECT name, host_dir 
    FROM pubmed_ftp 
    WHERE pubtype="{pubtype}" 
      and name not in(".","..")
      and retrieved is NULL
    ORDER BY name;
  '''.format(pubtype=pubtype)
  c.execute(sql)
  rows = c.fetchall()
  
  # FTP connect
  ftp = FTP(host)
  ftp.set_pasv(False)
  ftp.login(user='anonymous', passwd='hb@dnaiq.com')
  ftp.cwd(host_dir)
  
  for row in rows:
    # print('name:', row[0], ' dir: ', row[1])

    host_file = row[0]
    local_file = local_dir + row[0]

    if not os.path.isfile(local_file):
      print('Retreiving ' + host_file)
    
      ftp.retrbinary("RETR " + host_file, open(local_file, 'wb').write)
      rtv = datetime.now()
      sql = '''
        UPDATE pubmed_ftp
        set retrieved = "{rtv}"
        WHERE name="{name}" and host_dir="{host_dir}"
      '''.format(name=host_file, host_dir=host_dir, rtv=rtv)
      u.execute(sql)
      conn.commit() 
      
    else:
      print('File ' + local_file + ' already exists')
   
  c.close()
  u.close()
  ftp.quit()
  
  return

## VALIDATE & EXPAND
def vld_pubmed(local_dir, pubtype, conn):
  print('>>> VALIDATING BASE FILES <<<')
  
  # list the pubtype files to validate
  c = conn.cursor()
  u = conn.cursor()
  
  sql = '''
    SELECT name, host_dir 
    FROM pubmed_ftp 
    WHERE pubtype="{pubtype}" 
      and name not in(".","..") 
      and name like "%.xml.gz"
      and retrieved is not NULL
    ORDER BY name;
  '''.format(pubtype=pubtype)
  
  c.execute(sql)
  rows = c.fetchall()
  
  # validate and expand
  for row in rows:
    local_file = local_dir + row[0]
    with open(local_file + '.md5') as txt:
      line = txt.read()
      ftp_md5 = line.split('=')[1].strip()
      calc_md5 = md5sum(local_file)
    
      if ftp_md5 == calc_md5:
        with gzip.open(local_file, 'r') as f_in, open(local_dir + '/xml/' + row[0].strip('.gz'), 'wb') as f_out:
          shutil.copyfileobj(f_in, f_out)
        print('file:', row[0], ' md5 OK')
        result = datetime.now()

      else: 
        result = 'file:', row[0], ' md5 ' + ftp_md5 + ' does not match ' + calc_md5
        print(result)

      sql = '''
        UPDATE pubmed_ftp
        set validated = "{result}"
        WHERE name="{name}" and host_dir="{host_dir}"
      '''.format(name=row[0], host_dir=row[1], result=result)
      u.execute(sql)
      conn.commit() 
      
  c.close()
  u.close()
  return

def md5sum(filename):
  with open(filename, mode='rb') as f:
    d = hashlib.md5()
    for buf in iter(partial(f.read, 128), b''):
      d.update(buf)
  return d.hexdigest()

#############################################
## MAINLINE
#############################################

host = 'ftp.ncbi.nlm.nih.gov'
b_host_dir = '/pubmed/baseline/'
b_local_dir = '../data/pubmed/base/'
# file_pattern = 'pubmed19n*.xml.gz'

# Setup DB 
conn = sqlite3.connect('../data/pubmed.ftp.sqlite')
init_db(conn)

chk_pubmed(host, b_host_dir, 'BASE', conn)

get_pubmed(host, b_host_dir, b_local_dir, 'BASE', conn)

vld_pubmed(b_local_dir, 'BASE', conn)

u_host_dir = '/pubmed/updatefiles/'
u_local_dir = '../data/pubmed/updates/'

chk_pubmed(host, u_host_dir, 'UPDATES', conn)
get_pubmed(host, u_host_dir, u_local_dir, 'UPDATES', conn)
vld_pubmed(u_local_dir, 'UPDATES', conn)

conn.close()
