const { MongoClient } = require("mongodb");

class DB {
  constructor() {
    this.url =
      "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
    this.dbName = "bzztest";
  }

  async connectDB(doc) {
    const client = new MongoClient(this.url);
    await client.connect();
    console.log("✅ DB Connected!");
    const db = client.db(this.dbName);
    const labeling = db.collection(doc);
    return labeling;
  }
}

module.exports = { DB };
