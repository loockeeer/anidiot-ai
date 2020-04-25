
class SQLiteDatabase {
    constructor(fileName) {
        this._db = require('better-sqlite3')(fileName);
    }
    addIntent(text) {
        this._db.prepare('INSERT INTO intents VALUES (?)').run(text);
        return this;
    }
    resetIntents() {
        this._db.exec('DELETE FROM intents');
        return this;
    }
}
exports.default = SQLiteDatabase;
