import xmltree
import os, streams, xmlparser, strutils

proc parse_this*(xmlfile: string) =
 
  echo "building parser ..."
    
  let x = loadXml(xmlfile)
  # var s = newSeq[XmlNode]()
  echo typeof x
  var s = x.findAll("PubmedArticle")
  for i in s:
    echo i
    
parse_this("articles_sample.xml")