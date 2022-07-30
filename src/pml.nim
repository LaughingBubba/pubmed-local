import os, strutils
import dbs

if paramCount() < 1:
  quit "At least 1 pml command option is required (setup, ftp or load)"

let cmd = paramStr(1).toLowerAscii()

case cmd
of "ftp", "load":
  echo "not implemented yet"
of "setup":
  init_sqlite()
else:
  echo cmd & " not a valid pml option"

when isMainModule:
  block test:
    echo "test results"