import dotenv, os, strutils
import zip/gzipfiles
import streams
import md5

load()
const file_name = "pubmed22n1122.xml.gz"
let source = getEnv("pml_downloads") & file_name
echo "Source Md5:   ", $toMD5(readFile(source))

echo "Expected MD5: ", readFile(source & ".md5").split("=")[1].strip()

let target = getEnv("pml_xml") & file_name.split(".gz")[0]

let gz = newGzFileStream(source)
var x: File = open(target, fmWrite)

while not gz.atEnd():
  x.write(gz.readLine())
x.close

echo source
echo target