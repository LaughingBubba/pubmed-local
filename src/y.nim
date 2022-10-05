import xmltree
import z

let x = newElement("top")
x.add newText("abc")
assert $x == "<top>abc</top>"
assert x.elemText == "abc"

let c = newElement("child")
c.add newText("efg")
x.add c
assert $x == "<top>abc<child>efg</child></top>"
assert x.elemText == "abc"
assert x.child("child").elemText == "efg"

x.add newText("xyz")
assert $x == "<top>abc<child>efg</child>xyz</top>"
assert x.elemText == "abcxyz"
assert x.elemText(" ") == "abc xyz"

echo x.elemText("\p")
let e = newElement("empty")
echo e.elemText