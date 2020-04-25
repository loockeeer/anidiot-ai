
const Network = require("./Network");
const SQLiteDatabase = require("./SQLiteDatabase");
class Brain {
    constructor(dbFilename, datasets) {
        this._db = new SQLiteDatabase(dbFilename);
        this._network = new Network();
        this._datasets = datasets;
    }
    build() {
        for (const dataset of this._datasets) {
            this._network.train(dataset.X, dataset.Y);
        }
        return this;
    }
    _addIntent(text) {
        this._db.addIntent(text);
    }
    learn(text) {
        this._addIntent(text);
        this._network.train(text, text);
        return this;
    }
    generate(text) {
        this.learn(text);
        return this._network.generate(text);
    }
}
exports.default = Brain;
