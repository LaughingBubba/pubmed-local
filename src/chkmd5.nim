import dotenv, os, strutils

load()
const file_name = "pubmed22n1122.xml.gz"
let source = getEnv("pml_downloads") & file_name
let target = getEnv("pml_xml") & file_name.split(".gz")[0]
echo source
echo target