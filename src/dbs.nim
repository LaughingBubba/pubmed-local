import std/db_sqlite

proc init_sqlite* (dbname: string) =
  let db = open(dbname, "", "", "")
  let stmt = """	
    CREATE TABLE IF NOT EXISTS pubmed_ftp (
      name TEXT,
      size INT,
      pubtype TEXT,
      sts TEXT,
      err TEXT,
      PRIMARY KEY (name)
    );
  """
  db.exec(sql(stmt))
  db.close()

proc list_files* (dbname: string): seq =
  let db = open(dbname, "", "", "")
  let stmt = """	
    SELECT name
    FROM pubmed_ftp
    WHERE name like '%gz'
      and sts = 'NEW'
    ORDER BY name
  """
  let rows: seq = db.getAllRows(sql(stmt))
  db.close()
  return rows
