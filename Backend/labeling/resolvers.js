const { Collection } = require("mongo");
const MongoDb = require("mongodb");
const { DB } = require("../models/db");

const GetAllLabelers = async (_, args, context, info) => {
  const result = await coll.find({}).toArray();
  return result;
};

const SearchLabelers = async (_, args, context, info) => {
  const labeler = args.labeler;
  const result = await coll.find({ labeler }).toArray();
  return result;
};

const DeleteLabelers = async (_, { labeler }) => {
  try {
    console.log("labeler: ", labeler);
    const result = await coll.deleteOne({ labeler }).toArray();
    console.log("pong!");
    console.log("result: ", result);
    return result;
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

const resolvers = {
  Query: {
    getAllLabelers: GetAllLabelers,
    searchLabelers: SearchLabelers,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
  },
};

module.exports = { resolvers };
