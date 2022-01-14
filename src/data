require('dotenv').config()
const solr = require('solr-client')

const solr_client = solr.createClient({host:'localhost', core:'pubmed'})

const items = [
	{id: 1, text:'apple'},
	{id: 2, text:'orange'},
	{id: 3, text:'pears, oranges and apples'}
]

main()

async function main() {
	console.log("add:", await solr_client.add(items))
	console.log("commit:", await solr_client.commit())
	
	console.log("update:", await solr_client.update({id: 3, text:'cantaloupe'}))
	console.log("commit:", await solr_client.commit())
}

/*
Update schema:   
curl -X POST -H 'Content-type:application/json' --data-binary '{
  "add-field": [
  {
	"name": "text",
	"type": "text_general"
	"indexed": true,
	"required": true,
  }]
}' http://localhost:8983/solr/pubmed/schema
*/
/*
{
		"AbstractText": [
		  {
			"value": "In premature infants ",
			"Label": "OBJECTIVES",
			"NlmCategory": "OBJECTIVE"
		  },
		  {
			"value": "We conducted",
			"Label": "STUDY DESIGN",
			"NlmCategory": "METHODS"
		  }
		]
}

for (item of a) {
	obj.abstract = obj.abstract + ' ' + item.value
}

{$or:[{_id:35007442}, {$exists: "Article.Abstract.AbstractText.i"}, {$exists: "Article.Abstract.AbstractText.b"]}}
*/