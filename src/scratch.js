const superagent = require('superagent')

const docs = 
	[
		{
			id: '1a',
			title: 'title',
			// abstract: 'apples',
			version: 1,
			xmlfile: 'a',
		},
		{
			id: '2a',
			title: 'title',
			// abstract: 'berries',
			version: 2,
			xmlfile: 'a',
		},
		{
			id: '3a',
			title: 'title',
			// abstract: 'peaches',
			version: 2,
			xmlfile: 'b',
		},
		{
			id: '4a',
			title: 'title',
			// abstract: 'carrots',
			version: 1,
			xmlfile: 'c',
		},
	]
	
const addcmd = {add: docs}


const dels = 
	[
		{
			id: 2,
		},
		{
			id: 4,
		},
	]
const delcmd = {delete: dels}

// db.articles.deleteMany({xmlfile:"/Volumes/JS-EVO970-plus/pubmed/xml/pubmed22n0316.xml"})
// m: 17970000 d:17929610 diff: 40,390
// 441 short fall 24,741
// 330 short fall 15,649

const del2 = {delete: [
	// {query:'(id:2) AND (version:2)'},
	{query:'xmlfile:"/Volumes/JS-EVO970-plus/pubmed/xml/pubmed22n0314.xml"'},
	{query:'xmlfile:"/Volumes/JS-EVO970-plus/pubmed/xml/pubmed22n0315.xml"'},
	{query:'xmlfile:"/Volumes/JS-EVO970-plus/pubmed/xml/pubmed22n0316.xml"'},
]}

async function main() {

	try {
		// await superagent
		// 		.post('http://localhost:8983/solr/pubmed/update?commit=true')
		// 		.set('Content-type', 'application/json')
		// 		.send(addcmd)
		await superagent
				.post('http://localhost:8983/solr/pubmed/update?commit=true')
				.set('Content-type', 'application/json')
				.send(del2)
		
	} catch (err) {
		console.log(Object.getOwnPropertyNames(err))
		console.error(err.name)
		console.error(err.message)
		console.error(err.status)
		console.error(err.response.error.text)
	}	

}

main()