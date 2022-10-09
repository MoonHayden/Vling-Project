const _mongodb = require("mongodb");
const { DB_URL, DB_NAME } = require("../.env");
const _asyncMutex = require("async-mutex");

class DB {
  constructor() {
    this.url = process.env.DB_URL;
    this.dbName = process.env.DB_NAME;

    this.cache;
  }
  async connectDB(doc) {
    console.log("doc: ", doc);
    if (!this.cache) {
      this.cache = await this.createDBClient();
      console.log("✅ DB Connected!");
      let a = await this.createDBClient();
      const db = await a.db(this.dbName);
      const collection = await db.collection(doc);
      return collection;
    } else {
      const db = await this.cache.db(this.dbName);
      const collection = await db.collection(doc);
      return collection;
    }
  }
  async createDBClient() {
    return await _mongodb.MongoClient.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
module.exports = DB;
