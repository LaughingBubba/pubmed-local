import time
import gzip
import lxml
import xmltodict
import json
from bs4 import BeautifulSoup

import test

zipfile = "/Volumes/JS-EVO970-plus/pubmed/downloads/pubmed22n0001.xml.gz"

# >>> def handle_artist(_, artist):
# ...     print(artist['name'])
# ...     return True
# >>> 
# >>> xmltodict.parse(GzipFile('discogs_artists.xml.gz'),
# ...     item_depth=2, item_callback=handle_artist)

def extract_articles(file_name):
	"""GZ EXTRACTION AND INDEXATION"""
	tst = time.time()
	with gzip.open(file_name, 'rt', encoding='utf-8') as file_handler:  # Streaming file
		soup = BeautifulSoup(file_handler.read(), 'xml')  # Indexing XML
	articles = soup.find_all('PubmedArticle')  # Get data
	tsp = time.time()
	print('Parsing {} articles ({} min)'.format(
		len(articles), round((tsp - tst) / 60, 2)))
	return articles

def bf():
	articles = extract_articles(zipfile)

	print(len(articles), "articles found")
	print("first article:")
	print(articles[0])

	return

def x2():
	# print(test.xmldoc)
	# print(json.dumps(xmltodict.parse(str(articles[0]))), indent=2)
	print(json.dumps(xmltodict.parse(test.xmldoc), indent=2))
	
	return

x2()