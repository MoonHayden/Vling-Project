const { MongoClient } = require("mongodb");
const { DB_URL, DB_NAME } = require("../.env");

class DB {
  constructor() {
    this.url =
      "mongodb+srv://wecode_3:9qfVKZjgF9DgfPqg@wecode3.v22m4ud.mongodb.net/test";
    this.dbName = "bzznbyd";
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
