# CREATE TABLE medline.xmlFiles (
# 	file varchar(100) NOT NULL,
# 	started DATETIME NULL,
# 	completed DATETIME NULL
# )
# ENGINE=InnoDB
# DEFAULT CHARSET=latin1
# COLLATE=latin1_bin;

import sqlite3
import xml.etree.ElementTree as ET
from mysql import connector
from time import time
from datetime import datetime
from multiprocessing import Pool

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
pd_id=1313
doc='fart'
sql = '''
INSERT INTO tst
    (pmid, xmlBlob) 
VALUES( %s, %s);
''' 
data_tuple = (pd_id, doc)
mc.execute(sql, data_tuple)      
# conn.commit()   

mc.close()
myConn.close()
