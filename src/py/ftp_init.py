import argparse
import sqlite3
import configparser
from simple_chalk import chalk, green, yellow, blue, red
from ftplib import FTP
from datetime import datetime

#############################################
## FUNCTIONS
#############################################

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
		size_dl INT,
	  retrieved TEXT,
	  validated TEXT,
	  loaded TEXT,
	  pubtype TEXT,
		sts TEXT,
		err TEXT,
	  xmlBlob BLOB,
	  PRIMARY KEY (host_dir, name)
	);
	''')

## CHECK FOR FILES
def chk_pubmed(config, host_dir, pubtype, conn):
	print(blue('CHECKING'), yellow(pubtype), blue('FILES'))
	
	host = config.get('pubmed', 'ftp_host')
	user = config.get('pubmed', 'ftp_user')
	password = config.get('pubmed', 'ftp_password')
	
	c = conn.cursor()
	ftp = FTP(host)
	ftp.set_pasv(False)
	
	ftp.login(user=user, passwd=password)
	ftp.cwd(host_dir)
	
	size = 0
	for name, facts in ftp.mlsd():
		# print("name "+name+" size "+facts["size"])
		file_size = int(facts["size"])
		size += int(facts["size"])
		sql = '''
		  INSERT OR IGNORE INTO pubmed_ftp
			(name, host_dir, pubtype, size) 
		  VALUES("{name}", "{host_dir}", "{pubtype}", {size});
		'''.format(name=name,host_dir=host_dir,pubtype=pubtype,size=file_size) 
		c.execute(sql)      
		conn.commit()   
	
	ftp.quit()
	c.close()
	print(blue('Total files size'), yellow(str(size/1073741824)), blue('GB'))
	
	return

#############################################
## MAINLINE
#############################################

def main():
	config = configparser.ConfigParser()
	config.read("pubmed-db.cnf")
	
	parser = argparse.ArgumentParser()
	parser.add_argument("pubtype",help = "Nominate pubtype dowloads to be checked: BASE | UPDATE (case insensitive)")
	args = parser.parse_args()
	
	pubtype = str(args.pubtype).upper()

	if pubtype != 'BASE' and pubtype != 'UPDATE':
		print('invalid pubtype value', pubtype)
		return 
		
	if pubtype == 'BASE':
		host_dir = config.get('pubmed', 'base_folder')
		
	if pubtype == 'UPDATE':
		host_dir = config.get('pubmed', 'updates_folder')
	
	# Setup DB 
	controlDB = config.get('data', 'control_db')
	conn = sqlite3.connect(controlDB)
	init_db(conn)
	
	# check to see what files need to be downloaded
	chk_pubmed(config, host_dir, pubtype, conn)
	
	conn.close()
	return 

if __name__ == "__main__":
	main()
