# import fnmatch
import os
import sqlite3
import configparser
import argparse
import hashlib
from functools import partial
from time import sleep
from datetime import datetime

from simple_chalk import chalk, green, yellow, blue, red

import utils

## Get all eligible files for md5 checking
def get_md5list(pubtype, conn):
	c = conn.cursor()
	
	sql = '''
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype="{pubtype}" 
		  and sts in("OK") 
		  and name like "%.xml.gz"
		  and validated is NULL 
		  and size = size_dl
		ORDER BY name;
	'''.format(pubtype=pubtype)
	c.execute(sql)
	rows = c.fetchall()
	c.close()
	
	return rows

## Get all pending files
def get_pending(pubtype, conn):
	c = conn.cursor()
	sql = '''
		SELECT name, host_dir 
		FROM pubmed_ftp 
		WHERE pubtype="{pubtype}" 
	  	  and name like "%.xml.gz"
		  and validated is NULL
		ORDER BY name;
	'''.format(pubtype=pubtype)
	c.execute(sql)
	rows = c.fetchall()
	c.close()
	
	return rows

def check_loop(pubtype, conn):
	pending = len(get_pending(pubtype, conn))
	md5list = len(get_md5list(pubtype, conn))
	print(blue.bold(pubtype), yellow.bold(md5list), green.bold('items to check'), yellow.bold(pending), green.bold('items pending'))
	if md5list > 0 or pending > 0 :
		return True
	else:
		return False

## VALIDATE & EXPAND
def validate(config, pubtype, conn, item, dir):
	
	u = conn.cursor()
	
	# validate
	local_file = config.get('data', 'downloads') + item
	with open(local_file + '.md5') as txt:
		line = txt.read()
		ftp_md5 = line.split('=')[1].strip()
		calc_md5 = md5sum(local_file)
		
		if ftp_md5 == calc_md5:
			print(blue('file:'), blue.bold(item), green('OK'))
			sql = '''
				UPDATE pubmed_ftp
			      set validated = "{result}"
				WHERE name="{name}" and host_dir="{host_dir}"
			'''.format(name=item, host_dir=dir, result=datetime.now())
			u.execute(sql)
			conn.commit() 
			
		else: 
			result = 'file:', item, ' md5 ' + ftp_md5 + ' does not match ' + calc_md5
			print(result)
			print(blue('file:'), blue.bold(item), blue('md5'), yellow.bold(ftp_md5), red('does match'), yellow.bold(calc_md5))
			sql = '''
				UPDATE pubmed_ftp
	  				set size_dl = NULL, sts = "MD5-ERR"
				WHERE name="{name}" and host_dir="{host_dir}"
			'''.format(name=item, host_dir=dir)
			u.execute(sql)
			conn.commit() 

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

def main():
	
	parser = argparse.ArgumentParser()
	parser.add_argument("pubtype",help = "Nominate pubtype dowloads to be checked: BASE | UPDATE (case insensitive)")
	args = parser.parse_args()
	
	pubtype = str(args.pubtype).upper()
	
	if pubtype != 'BASE' and pubtype != 'UPDATE':
		print('invalid pubtype value', pubtype)
		return 
	
	config = configparser.ConfigParser()
	config.read("pubmed-db.cnf")
	
	# connect to DB 
	controlDB = config.get('data', 'control_db')
	conn = sqlite3.connect(controlDB)
	
	# Loop while you can
	while check_loop(pubtype, conn):
	
		md5list = get_md5list(pubtype, conn)
		for item in md5list:
			# print("item:",item[0])
			validate(config, pubtype, conn, item[0], item[1])
		
		if check_loop(pubtype, conn):
			print(green.bold('Sleeping for 5 mins'))
			sleep(300)
	else:
		print(green.bold('No more items pending'))
	
	conn.close()
	return 

if __name__ == "__main__":
	main()