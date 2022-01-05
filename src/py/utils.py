# import fnmatch
import os
import sqlite3
import configparser

from ftplib import FTP
from datetime import datetime

## GET / DOWNLOAD
def ftp_getfile(config, conn, host_file, host_dir):
	
	# FTP connect
	host = config.get('pubmed', 'ftp_host')
	user = config.get('pubmed', 'ftp_user')
	password = config.get('pubmed', 'ftp_password')
	
	local_file = config.get('data', 'downloads') + host_file
	
	# Delete if file already exists
	if os.path.isfile(local_file):
		os.remove(local_file)

	try: 
		ftp = FTP(host)
		ftp.set_pasv(False)
		ftp.login(user=user, passwd=password)
		ftp.set_pasv(False)
	
		try:
			ftp.cwd(host_dir)
			
			sts = "OK"
			err = ''
			
			try:
				u = conn.cursor()
				# print('Retrieving ' + host_file)
				ftp.retrbinary("RETR " + host_file, open(local_file, 'wb').write)
				
			except Exception as e:
				sts = "ERR"
				err = str(e)
				
			finally:
				print(host_file + ": " + sts, err)
				rtv = datetime.now()
				sts = sts
				
				if os.path.isfile(local_file):
					size_dl = os.path.getsize(local_file)
				else:
					size_dl = 0
					
				sql = '''
					UPDATE pubmed_ftp
					set retrieved="{rtv}", sts="{sts}", err="{err}", size_dl={size_dl}
					WHERE name="{name}" and host_dir="{host_dir}"
				'''.format(name=host_file, host_dir=host_dir, rtv=rtv, sts=sts, err=err, size_dl=size_dl)
				u.execute(sql)
				conn.commit()
				u.close()
				
		finally:
			ftp.quit()

	except Exception as e:
		print('ftp_getfile error:', str(e))
			
	return
# investigative audit