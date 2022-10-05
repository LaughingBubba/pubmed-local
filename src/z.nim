import xmltree
## xNode* {.borrow: `.`.} = xmltree.XmlNode
type 
  XmlNode* {.borrow: `.`.} = distinct XmlNode 

proc elemText*(n: XmlNode, separator = ""): string {.inline.} =
  # echo $n
  echo n.kind
  # 
  # assert n.kind == xnElement
  # proc worker(res: var string, n: seq[xNode], i: int = 0) =
  #   if i < n.len:
  #     if n[i].kind == xnText:
  #       # echo $n
  #       # res.add(n[i].fText)
  #       if i < n.len - 1:
  #         res.add(separator)
  #     
  #     worker(res, n, i + 1)
  # 
  # result = ""
  # worker(result, n.s)

let x = newElement("top")
x.add newText("abc")

let c = newElement("child")
c.add newText("efg")
x.add c

x.add newText("xyz")
echo x.elemText