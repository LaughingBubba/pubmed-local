import os, strutils
import dbs
import dotenv

load()

let control_db = os.getEnv("pml_control_db")

if paramCount() < 1:
  quit "At least 1 pml command option is required (setup, ftp or load)"

let cmd = paramStr(1).toLowerAscii()

case cmd
of "ftp", "load":
  echo "not implemented yet"
of "setup":
  init_sqlite(control_db)
  let rows = list_files(control_db)
  for row in rows:
    echo row[0]
else:
  echo cmd & " not a valid pml option"

when isMainModule:
  block test:
    echo "test results"