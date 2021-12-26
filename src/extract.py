import sqlite3
import xml.etree.ElementTree as ET
from time import time
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

  # Create articles
  c.execute(
    '''
    CREATE TABLE IF NOT EXISTS articles (
      pmid INT,
      title TEXT,
      abstract TEXT,
      name TEXT,
      host_dir TEXT,
      xmlBlob BLOB,
      PRIMARY KEY (pmid, host_dir, name)
    );
    ''')

  return

# Parse and article set xml file
def extract(filename, dir_local, conn):

  # Write article to DB
  def putArticle(filename, dir_local, pmid, title, abstract, doc, conn):
    u = conn.cursor()
    sql = '''
      INSERT OR REPLACE INTO articles
        (name, host_dir, pmid, title, abstract, xmlBlob) 
      VALUES( ?, ?, ?, ?, ?, ?);
    ''' 
    data_tuple = (filename, dir_local, pmid, title, abstract, doc)
    u.execute(sql, data_tuple)      
    # conn.commit()   

    return

  start = time()
  cnt = 0
 
  print('>> Load xml')
  tree = ET.parse(xml_file)
  root = tree.getroot()
  end = time()
  elapsed = end - start
  print('Load time(sec): ' + str(elapsed))
  print('>> Looping through elements')
  print('')

  pv_pmid = 0
  pmid = 0
  title = ''
  abstract = ''
  doc = ''

  for x0 in root:
    cnt = cnt + 1

    if pv_pmid != pmid:
      putArticle(filename, dir_local, pmid, title, abstract, doc, conn)
      pv_pmid = pmid
      title = ''
      abstract = ''
      doc = ''
  
    doc = ET.tostring(x0, encoding='utf8').decode('utf8')
    if (x0.tag).endswith('PubmedArticle'):
      x0L = list(x0)
      for x1 in x0L:
        if (x1.tag).endswith('MedlineCitation'):
          x1L = list(x1)
          for x2 in x1L:

            if (x2.tag).endswith('PMID'):
              pmid = x2.text

            if (x2.tag).endswith('Article'):
              x2L = list(x2)
            
              for x3 in x2L:
            
                if (x3.tag).endswith('ArticleTitle'):
                  title = x3.text
                
                if (x3.tag).endswith('Abstract'):
                  x3L = list(x3)
                  for x4 in x3L:

                    if (x4.tag).endswith('AbstractText'):
                      abstract = x4.text


  putArticle(filename, dir_local, pmid, title, abstract, doc, conn)
  conn.commit() 
  end = time()
  elapsed = end - start
  print('# of articles: ' + str(cnt) + ' for ' + xml_file + ' elapsed secs: ' + str(elapsed))
  return

#############################################

import sqlite3 import xml.etree.ElementTree as ET from mysql import connector from time import time from datetime import datetime from multiprocessing import Pool def init_db(conn):   c = conn.cursor()   # Create articles   c.execute(     '''         CREATE TABLE IF NOT EXISTS infile.articles (             xml_tablecol int(11) NOT NULL AUTO_INCREMENT,             PMID text GENERATED ALWAYS AS (extractvalue(xml,'//PMID')) STORED,             title_gen text GENERATED ALWAYS AS (extractvalue(xml,'//ArticleTitle')) STORED,             abstract_gen text GENERATED ALWAYS AS (extractvalue(xml,'//AbstractText')) STORED,             xml text,                 PRIMARY KEY (xml_tablecol)         ) DEFAULT CHARSET=utf8;     ''')   return ############################################# ## MAINLINE ############################################# # Setup DB print('Start extraction') config = {     'host': 'localhost',     'user': 'root',     'password': '',     'database': '',     'use_pure': True,     'raise_on_warnings': True,     'get_warnings': True,     'autocommit': True } myConn = connector.connect(**config) mc = myConn.cursor(buffered=True) conn = sqlite3.connect('../data/pubmed.ftp.sqlite') init_db(myConn) rc = conn.cursor() # read only cursor sql = '''   SELECT name, host_dir   FROM pubmed_ftp   WHERE pubtype="{pubtype}"     and name not in(".","..")     and validated is not NULL   ORDER BY name; '''.format(pubtype='BASE') rc.execute(sql) rows = rc.fetchall() cnt = 0 files = [] for row in rows:   start = time()   xml_file =  '../data/pubmed/base/xml/' + row[0].strip('.gz')   sql = '''     LOAD DATA LOCAL INFILE '%s'             INTO TABLE infile.articles             LINES TERMINATED BY '<PubmedArticle>'             IGNORE 3 LINES             (xml)             SET xml = concat("<PubmedArticle>",xml);   '''   data_tuple = (xml_file)   mc.execute(sql, data_tuple)      end = time()   elapsed = end - start   print('load of : ' + xml_file + ' elapsed secs: ' + str(elapsed))  mc.close() myConn.close() conn.close() print('!! DONE !!')


sql = '''
  SELECT name, host_dir 
  FROM pubmed_ftp 
  WHERE pubtype="{pubtype}" 
    and name not in(".","..")
    and validated is not NULL
    and loaded is NULL
  ORDER BY name;
'''.format(pubtype='BASE')
rc.execute(sql)
rows = rc.fetchall()

for row in rows:
  filename = row[0].strip('.gz')
  dir_local = '../data/pubmed/base/xml/'
  xml_file =  dir_local.strip() + filename.strip()
  
  extract(filename, dir_local, conn)
  rtv = datetime.now()
  sql = '''
    UPDATE pubmed_ftp
    set loaded = "{rtv}"
    WHERE name="{name}" and host_dir="{host_dir}"
      '''.format(name=row[0], host_dir=row[1], rtv=rtv)
  ru.execute(sql)      
  conn.commit() 

conn.close()
