// module.exports = function squareAsync(x) {
//   return Promise.resolve().then(() => {
// 	  console.log('running process:')
// 	  return x * x
//   });
// }

function worker(x) {
	// return new Promise( async (resolve, reject) => {
		// const chalk = await import('chalk')
		// const test3 = await import('./test3.js') 
		const product = x * x
		console.log('running process:', process.pid, process.env.AAA)
		// console.log('running process:', product, process.getuid())
		return product
		// resolve(product)	
	// })
}

module.exports = worker