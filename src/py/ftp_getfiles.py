import argparse
import os
import sqlite3
import configparser
from time import sleep

from simple_chalk import chalk, green, yellow

import utils

## Get all mismatched sizes for reprocessing
def get_mismatch(pubtype, conn):
	
	# list the pubtype files to get
	c = conn.cursor()
	
	sql = '''
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype="{pubtype}" 
		  and name not in(".","..")
		  and size_dl is NOT NULL 
		  and size <> size_dl
		ORDER BY name;
	'''.format(pubtype=pubtype)
	c.execute(sql)
	rows = c.fetchall()
	c.close()
	
	return rows

## Get all pending files
def get_pending(pubtype, conn):
	
	# list the pubtype files to get
	c = conn.cursor()
	
	sql = '''
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype="{pubtype}" 
		  and name not in(".","..")
		  and size_dl is NULL
		ORDER BY name;
	'''.format(pubtype=pubtype)
	c.execute(sql)
	rows = c.fetchall()
	c.close()
	
	return rows

def check_loop(pubtype, conn):
	pending = len(get_pending(pubtype, conn))
	mismatch = len(get_mismatch(pubtype, conn))
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
	
	# Setup DB 
	conn = sqlite3.connect(config.get('data', 'control_db'))
	
	# Loop while you can
	while check_loop(pubtype, conn):
	
		pending = get_pending(pubtype, conn)
		for item in pending:
			# print("item:",item[0])
			utils.ftp_getfile(config, conn, item[0], item[1])
				
		mismatch = get_mismatch(pubtype, conn)
		for item in mismatch:
			# print("item:",item[0])
			utils.ftp_getfile(config, conn, item[0], item[1])
		
		if check_loop(pubtype, conn):
			print(green.bold('Sleeping for 5 mins'))
			sleep(300)
	else:
		print(green.bold('No more items pending or with size issues'))	
	conn.close()
	return 

if __name__ == "__main__":
	main()
