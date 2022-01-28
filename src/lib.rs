use dotenv::dotenv;
use rusqlite::{Connection, Result};
use std::env;

pub fn init_dbs() {
	println!("initialising DBs");
	dotenv().ok();
	// init_sqlite();
	match init_sqlite() {
		Ok(v) => println!("{:?} items in the DB", v),
		Err(e) => panic!("Could not initialise sqlite ({})", e)
	}
	
// 	let mongo_uri: String;	
// 	name = "pubmed_db_mongo_uri";
// 	match env::var(name) {
// 		Ok(v) => mongo_uri = v,
// 		Err(e) => panic!("${} is not set ({})", name, e)
// 	}
// 
// 	println!("{}, {}", mongo_uri, sqlite_db);
	
	fn init_sqlite () -> Result<()> {

		let sqlite_db: String;	
		let name = "pubmed_db_control_db";
		match env::var(name) {
			Ok(v) => sqlite_db = v,
			Err(e) => panic!("${} is not set ({})", name, e)
		}

		let conn = Connection::open(sqlite_db)?;
		
		conn.execute(
			"
				CREATE TABLE IF NOT EXISTS pubmed_ftp (
  				name TEXT,
  				size INT,
  				pubtype TEXT,
  				sts TEXT,
  				err TEXT,
  				PRIMARY KEY (name)
				);
			 ",
			[],
		)?;
		
		struct Medfile {
			name: String
		}
		let mut files: i64 = 0;
		
		let mut stmt = conn.prepare("
			SELECT name FROM pubmed_ftp
			WHERE name like '%.gz'
			   OR name like '%.md5'
		")?;
		
		let files_iter = stmt.query_map([], |row| {
			Ok(Medfile {
				name: row.get(0)?,
			})
		})?;
		
		for _item in files_iter {
			files += 1;
		}
		
		println!("{} items", files);
		Ok(())
	}
}

pub fn check_md5s() {
	println!("checking MD5s");
}

pub fn ftp_files() {
	println!("FTP mirroring");
}

pub fn load() {
	println!("loading");
}