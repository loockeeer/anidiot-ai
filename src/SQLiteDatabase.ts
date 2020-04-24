export default class SQLiteDatabase {
  private _db: any;
  constructor(fileName: string) {
    this._db = require('better-sqlite3')(fileName)
  }
  addIntent(text: string): SQLiteDatabase {
    this._db.prepare('INSERT INTO intents VALUES (?)').run(text)
    return this
  }
  resetIntents(): SQLiteDatabase {
    this._db.exec('DELETE FROM intents')
    return this
  }
}
