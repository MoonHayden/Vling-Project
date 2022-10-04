const { MongoClient } = require("mongodb");
const { DB_URL, DB_NAME } = require("../.env");

class DB {
  constructor() {
    this.url = "mongodb+srv://root:inflearn@cluster0.nlz10iu.mongodb.net/test";
    this.dbName = "bzztest";
  }

  async connectDB(doc) {
    console.log("doc: ", doc);
    const client = new MongoClient(this.url);
    await client.connect();
    console.log("✅ DB Connected!");
    const db = client.db(this.dbName);
    const collection = db.collection(doc);
    return collection;
  }
}

module.exports = DB;
