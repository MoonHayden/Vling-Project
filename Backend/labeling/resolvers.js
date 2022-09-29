// const { Collection } = require("mongo");
const MongoDb = require("mongodb");
const { DB } = require("../models/db");

const Labelers = async (_, args, context, info) => {
  const check = await coll.connectDB("labeling");
  const result = await check.find({}).toArray();
  return result;
};

const Labeler = async (_, args, context, info) => {
  const check = await coll.connectDB("labeling");
  const labeler = args.labeler;
  const result = await check.find({ labeler }).toArray();
  return result;
};

const DeleteLabelers = async (_, labeler) => {
  try {
    const check = await coll.connectDB("labeling");
    const result = await check.deleteMany(labeler);
    console.log(result);
    return [labeler];
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
  },
};

module.exports = { resolvers };
