import process from 'process'
import {yellow} from 'chalk'

async main() {

	console.log('starting process:', yellow(global.process.id))
	
	process.exit(0)
}

export default main