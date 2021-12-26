import sqlite3
import xml.etree.ElementTree as ET
from mysql import connector
from time import time
from datetime import datetime
from multiprocessing import Pool

def init_db(conn):

  c = conn.cursor()

  # Create articles
  c.execute(
    '''
        CREATE TABLE IF NOT EXISTS infile.articles (
            xml_tablecol int(11) NOT NULL AUTO_INCREMENT,
            PMID text GENERATED ALWAYS AS (extractvalue(xml,'//PMID')) STORED,
            title_gen text GENERATED ALWAYS AS (extractvalue(xml,'//ArticleTitle')) STORED,
            abstract_gen text GENERATED ALWAYS AS (extractvalue(xml,'//AbstractText')) STORED,
            xml text,
                PRIMARY KEY (xml_tablecol) 
        ) DEFAULT CHARSET=utf8;
    ''')

  return

#############################################
## MAINLINE
#############################################

# Setup DB 
print('Start extraction')
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': '',
    'use_pure': True,
    'raise_on_warnings': True,
    'get_warnings': True,
    'autocommit': True
}
myConn = connector.connect(**config)
mc = myConn.cursor(buffered=True)

conn = sqlite3.connect('../data/pubmed.ftp.sqlite')

init_db(myConn)
rc = conn.cursor() # read only cursor

sql = '''
  SELECT name, host_dir 
  FROM pubmed_ftp 
  WHERE pubtype="{pubtype}" 
    and name not in(".","..")
    and validated is not NULL
  ORDER BY name;
'''.format(pubtype='BASE')
rc.execute(sql)
rows = rc.fetchall()

cnt = 0
files = [] 
for row in rows:
  start = time()

  xml_file =  '../data/pubmed/base/xml/' + row[0].strip('.gz')
  sql = '''
    LOAD DATA LOCAL INFILE '%s'
            INTO TABLE infile.articles 
            LINES TERMINATED BY '<PubmedArticle>'
            IGNORE 3 LINES
            (xml)
            SET xml = concat("<PubmedArticle>",xml);
  ''' 
  data_tuple = (xml_file)
  mc.execute(sql, data_tuple)    
  end = time()
  elapsed = end - start
  print('load of : ' + xml_file + ' elapsed secs: ' + str(elapsed))
 
mc.close()
myConn.close()
conn.close()

print('!! DONE !!')
