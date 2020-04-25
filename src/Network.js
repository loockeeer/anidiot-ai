
const brainjs = require("brain.js");
class Network {
    constructor() {
        this._network = new brainjs.recurrent.LSTM();
    }
    train(x, y) {
        this._network.train([{
                input: x,
                output: y
            }], {});
        return this;
    }
    trainBatch(X, Y) {
        this._network.train(X.map((v, i) => ({ input: v, output: Y[i] })), {});
        return this;
    }
    generate(x) {
        return this._network.run(x);
    }
    reset() {
        this._network = new brainjs.recurrent.LSTM();
        return this;
    }
}
exports.default = Network;
