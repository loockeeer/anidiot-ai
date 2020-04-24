import Network from './Network'
import Dataset from './Dataset'
import SQLiteDatabase from './SQLiteDatabase'

export default class Brain {
  private _network: Network;
  private _db: SQLiteDatabase;
  private _datasets: Dataset[];
  constructor(dbFilename: string, datasets: Dataset[]) {
    this._db = new SQLiteDatabase(dbFilename)
    this._network = new Network()
    this._datasets = datasets
  }
  build(): Brain {
    for(const dataset of this._datasets) {
      this._network.train(dataset.X, dataset.Y)
    }
    return this
  }
  private _addIntent(text: string) {
    this._db.addIntent(text)
  }
  learn(text: string): Brain {
    this._addIntent(text)
    this._network.train(text, text)
    return this
  }
  generate(text: string): string {
    this.learn(text)
    return this._network.generate(text)
  }
}
