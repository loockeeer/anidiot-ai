import * as brainjs from 'brain.js'

export default class Network {
	_network: brainjs.recurrent.LSTM
	constructor() {
		this._network = new brainjs.recurrent.LSTM()
	}
	train(x: string, y:string): Network {
		this._network.train([{
			input: x,
			output: y
		}], {})
		return this
	}
	trainBatch(X: string[], Y: string[]): Network {
		this._network.train(X.map((v,i)=>({input: v, output: Y[i]})), {})
		return this
	}
	generate(x: string): string {
		return this._network.run(x)
	}
	reset(): Network {
		this._network = new brainjs.recurrent.LSTM()
		return this
	}
}
