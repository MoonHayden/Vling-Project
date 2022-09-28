const { MongoClient } = require("mongodb");

class DB {
  constructor() {
    this.url =
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
    this.dbName = "bzztest";
  }

  async connectDB() {
    const client = new MongoClient(this.url);
    await client.connect();
    console.log("✅ DB Connected!");
    const db = client.db(this.dbName);
    const collection = db.collection("labeling");
    return collection;
  }
}

module.exports = { DB };
