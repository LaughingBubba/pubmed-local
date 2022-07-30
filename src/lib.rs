use dotenv::dotenv;
use rusqlite::{Connection, Result};
use mongodb::{bson::doc, options::ClientOptions, Client};
use json::*;
use reqwest;
use reqwest::header::{CONTENT_TYPE, ACCEPT};
use tokio::io::{self, AsyncReadExt};
use tokio::fs::File;
use std::env;

pub async fn init_dbs() {
	println!("initialising DBs");
	dotenv().ok();
	
	match init_sqlite().await {
		Ok(_v) => println!("sqlite initialised"),
		Err(e) => panic!("Could not initialise sqlite ({})", e)
	}
	
	match init_mongo().await {
		Ok(_v) => println!("mongo initialised"),
		Err(e) => panic!("Could not initialise monogo ({})", e)
	}
	
	match init_solr().await {
		Ok(_v) => println!("solr initialised"),
		Err(e) => panic!("Could not initialise solr ({})", e)
	}
	
	async fn init_sqlite () -> Result<()> {

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
			#[allow(dead_code)]
			name: String
		}
		#[allow(unused_variables)]
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
		
		// println!("{} items", files);
		Ok(())
	}
	
	async fn init_mongo() -> mongodb::error::Result<()> {
		
		let mongo_uri: String;	
		let name = "pubmed_db_mongo_uri";
		match env::var(name) {
			Ok(v) => mongo_uri = v,
			Err(e) => panic!("${} is not set ({})", name, e)
		}

		// Parse your connection string into an options struct
		let mut client_options =
			ClientOptions::parse(mongo_uri)
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
			
		// If you get to here the mongo API hasnt paniced because it could connect 
		// List the names of the databases in that cluster
		for db_name in client.list_database_names(None, None).await? {
			println!("{}", db_name);
		}
		Ok(())
	}
	
	async fn init_solr () -> Result<()> {
		
		let schema = object!{"add-field": 				
			[
				  {
					name: "title",
					type: "text_general",
					indexed: true,
					required: true,
				  },
				  {
					name: "abstract",
					type: "text_general",
					indexed: true,
					required: true,
				  },
				  {
					name: "version",
					type: "string",
					indexed: false,
					required: true,
				},
				{
					name: "xmlfile",
					type: "string",
					indexed: true,
					required: true,
				}
			]	
		};
		
		let solr_uri = "http://localhost:8983/solr/pubmed/schema";
		let client = reqwest::Client::new();
		let _res = client
			.post(solr_uri)
			.header(CONTENT_TYPE, "application/json")
			.header(ACCEPT, "application/json")
			.body(json::stringify(schema))
			.send()
			.await
			.unwrap();
		// println!("{:#?}", _res);
		Ok(())
	}
}

pub async fn check_md5s() -> Result<()> {
	println!("checking MD5s");
	
	let sqlite_db: String;	
	let name = "pubmed_db_control_db";
	match env::var(name) {
		Ok(v) => sqlite_db = v,
		Err(e) => panic!("${} is not set ({})", name, e)
	}
	
	let conn = Connection::open(sqlite_db)?;
	
	struct Medfile {
		#[allow(dead_code)]
		name: String
	}
	#[allow(unused_variables)]
	let mut files: i64 = 0;
	
	let mut stmt = conn.prepare("
		SELECT name
		FROM pubmed_ftp
		WHERE name like '%gz'
  		and sts = 'NEW'
		ORDER BY name
	")?;
	
	let files_iter = stmt.query_map([], |row| {
		Ok(Medfile {
			name: row.get(0)?,
		})
	})?;
	
	for _item in files_iter {
		files += 1;
	}
	
	// println!("{} items", files);
	Ok(())
}

pub fn ftp_files() {
	println!("FTP mirroring");
}

pub fn load() {
	println!("loading");
}