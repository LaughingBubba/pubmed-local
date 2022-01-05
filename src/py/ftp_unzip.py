import argparse
import sqlite3
import configparser
import gzip, shutil
from simple_chalk import chalk, green, yellow, blue, red
from datetime import datetime
import os
from simple_chalk import chalk, green, yellow
import utils

#############################################
## FUNCTIONS
#############################################

## Get all matched files for reprocessing
def get_match(pubtype, conn):
	
	# list the pubtype files to get
	c = conn.cursor()
	
	sql = '''
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype="{pubtype}" 
		  and name like "%.gz"
		  and size_dl is NOT NULL 
		  and size = size_dl
		ORDER BY name;
	'''.format(pubtype=pubtype)
	c.execute(sql)
	rows = c.fetchall()
	c.close()
	
	return rows

def check_loop(pubtype, conn):
	match = len(get_mismatch(pubtype, conn))
	print(yellow.bold(mismatch), green.bold('items with size issues and'), yellow.bold(pending), green.bold('items pending'))
	if mismatch > 0 or pending > 0 :
		return True
	else:
		return False

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
		
	dl_dir = config.get('data', 'downloads')
	xml_dir = config.get('data', 'xml')
	
	# Setup DB 
	conn = sqlite3.connect(config.get('data', 'control_db'))
			
	match = get_match(pubtype, conn)
	for item in match:
		with gzip.open(dl_dir + item[0], 'r') as f_in, open(xml_dir + item[0].strip('.gz'), 'wb') as f_out:
		  shutil.copyfileobj(f_in, f_out)
		
	conn.close()
	return 

if __name__ == "__main__":
	main()
