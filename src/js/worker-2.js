function worker(x) {
	// return new Promise( (resolve, reject) => {
		const product = x * x
		console.log('running process:', process.pid,  process.env.AAA, product)
		return product	
		// resolve(product)	
	// })
}

export default worker