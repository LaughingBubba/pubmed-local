import std/db_sqlite

proc init_sqlite* =
  let db = open("some_db.sqlite", "", "", "")
  let smt = """	
    CREATE TABLE IF NOT EXISTS pubmed_ftp (
      name TEXT,
      size INT,
      pubtype TEXT,
      sts TEXT,
      err TEXT,
      PRIMARY KEY (name)
    );
  """
  db.exec(sql(smt))
  db.close()