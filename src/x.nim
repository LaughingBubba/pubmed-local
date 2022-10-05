import xmltree, xmlparser
var
  b = newElement("good")
  c = newElement("bad")
  d = newElement("BAD")
  e = newElement("GOOD")
b.add newText("b text")
c.add newText("c text")
d.add newText("d text")
e.add newText("e text")
# let a = newXmlTree("father", [b, c, d, e])
let a = loadXml("articles_sample.xml")
var s = newSeq[XmlNode]()
a.findAll("PubmedArticle", s)
echo s
# assert $s == "@[<good>b text</good>]"
# s.setLen(0)
# a.findAll("good", s, caseInsensitive = true)
# assert $s == "@[<good>b text</good>, <GOOD>e text</GOOD>]"
# s.setLen(0)
# a.findAll("BAD", s)
# assert $s == "@[<BAD>d text</BAD>]"
# s.setLen(0)
# a.findAll("BAD", s, caseInsensitive = true)
# assert $s == "@[<bad>c text</bad>, <BAD>d text</BAD>]"