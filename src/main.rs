use pubmed_db::{init_dbs, ftp_files, check_md5s, load};

#[tokio::main]
async fn main() {
	
	let mut no_load = false;
	
	let args: Vec<String> = std::env::args().skip(1).collect();
	
	// This consumes the `args` vector to iterate through each String
	for arg in args {
		if arg == "noload" {
			no_load = true
		} 
	}
	
	init_dbs().await;
	ftp_files();
	check_md5s().await;
	if no_load == false {
		load();
	} else {
		println!("SKIPPING load");	
	}
}