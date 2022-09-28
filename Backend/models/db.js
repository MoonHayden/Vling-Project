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

  // async disconnectDB() {

  // }
}

// async function db() {
//   await client.connect();
//   console.log("✅ DB Connected!");
//   const db = client.db(dbName);
//   const collection = db.collection("labeling");
//   // console.log("collections: ", collection);

//   //   const filteredDocs = await collection.find({ value: "done" }).toArray();
//   //   console.log("Found documents filtered by { value: done } =>", filteredDocs);

//   //   const insertResult = await collection.insertOne({
//   //     labeler: "yerinzzang@email.com",
//   //     value: "done",
//   //   });
//   //   console.log("Inserted documents =>", insertResult);

//   //   const findResult = await collection.find({}).toArray();
//   //   console.log("Found documents =>", findResult);

//   //   return "done.";
// }

module.exports = { DB };
