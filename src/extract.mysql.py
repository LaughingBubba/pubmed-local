import sqlite3
import xml.etree.ElementTree as ET
from mysql import connector
from time import time
from datetime import datetime
from multiprocessing import Pool

## INITIALISE DB Connection
def init_db(conn):

  c = conn.cursor()

  # Create articles
  c.execute(
    '''
    CREATE TABLE IF NOT EXISTS articles (
      pmid INT,
      title TEXT,
      name TEXT,
      host_dir TEXT,
      xmlBlob BLOB,
      PRIMARY KEY (pmid, host_dir, name)
    );
    ''')

  return

# Parse and article set xml file
def extract(xml_file):
  config = {
      'host': 'localhost',
      'user': 'root',
      'password': '',
      'database': 'medline',
      'use_pure': True,
      'raise_on_warnings': True,
      'get_warnings': True,
      'autocommit': True
  }
  myConn = connector.connect(**config)
  mc = myConn.cursor(buffered=True)

  sql = '''
    INSERT INTO xmlFiles
      (file, started) 
    VALUES( %s, %s);
  ''' 
  data_tuple = (xml_file, datetime.now())
  mc.execute(sql, data_tuple)    

  start = time()
  cnt = 0

  tree = ET.parse(xml_file)
  root = tree.getroot()

  print('root tag: ' + root.tag)
  print('>> Looping through elements')
  print('')

  for x0 in root:
    cnt = cnt + 1
    # if cnt == 1:
      # print(ET.tostring(x0, encoding='utf8').decode('utf8'))

    doc = ET.tostring(x0, encoding='utf8').decode('utf8')
    if (x0.tag).endswith('PubmedArticle'):
      x0L = list(x0)
      for x1 in x0L:
        if (x1.tag).endswith('MedlineCitation'):
          x1L = list(x1)
          for x2 in x1L:
            if (x2.tag).endswith('PMID'):
              pd_id = x2.text
              print('Article >>>> ID ' + pd_id )
              # print(doc)
              sql = '''
                INSERT INTO articles
                  (pmid, xmlBlob, xmlFile) 
                VALUES( %s, %s, %s);
              ''' 
              data_tuple = (pd_id, doc, xml_file)
              mc.execute(sql, data_tuple)      
              # conn.commit()   

  sql = '''
    UPDATE xmlFiles 
      set completed=%s 
    WHERE file="%s";
  ''' 
  data_tuple = (datetime.now(), xml_file)
  mc.execute(sql, data_tuple)  
  
  mc.close()
  myConn.close()
  end = time()
  elapsed = end - start
  print('# of articles: ' + str(cnt) + ' for ' + xml_file + ' elapsed secs: ' + str(elapsed))
  return

#############################################
## MAINLINE
#############################################

# Setup DB 
print('Listing files for extraction')

conn = sqlite3.connect('../data/pubmed.ftp.sqlite')
init_db(conn)
rc = conn.cursor() # read only cursor

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

cnt = 0
files = [] 
for row in rows:
  xml_file =  '../data/pubmed/base/xml/' + row[0].strip('.gz')
  files.append(xml_file)
  cnt = cnt + 1

conn.close()
print(str(cnt) + ' files to process')

get_files = sorted(files)
#p = Pool(2)
#print('get files type : ' + str(type(get_files)))
#p.map(extract, get_files)
for file in get_files:
  extract(file)
print('!! DONE !!')
1
