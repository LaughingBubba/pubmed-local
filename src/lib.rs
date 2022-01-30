use dotenv::dotenv;
use rusqlite::{Connection, Result};
use mongodb::{bson::doc, options::ClientOptions, Client};
use std::env; 

pub fn init_dbs() {
	println!("initialising DBs");
	dotenv().ok();
	// init_sqlite();
	match init_sqlite() {
		Ok(v) => println!("{:?} items in the DB", v),
		Err(e) => panic!("Could not initialise sqlite ({})", e)
	}
	match init_mongo() {
		Ok(v) => println!("{:?} mongo initialised", v),
		Err(e) => panic!("Could not initialise monogo ({})", e)
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
	
	async fn init_mongo() -> mongodb::error::Result<()> {
		// Parse your connection string into an options struct
		let mut client_options =
			ClientOptions::parse("mongodb://root:access@localhost:27017")
				.await?;
		// Manually set an option
		client_options.app_name = Some("pubmed_db".to_string());
		// Get a handle to the cluster
		let client = Client::with_options(client_options)?;
		// Ping the server to see if you can connect to the cluster
		client
			.database("admin")
			.run_command(doc! {"ping": 1}, None)
			.await?;
		println!("Connected successfully.");
		// List the names of the databases in that cluster
		for db_name in client.list_database_names(None, None).await? {
			println!("{}", db_name);
		}
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