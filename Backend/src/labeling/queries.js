const DB = require("../../models/db");
const ObjectId = require("mongodb").ObjectId;
const db = new DB();

const LabelerLogIn = async (_, args, context, info) => {
  const labelerColl = await db.connectDB("labeling");

  console.log("args: ", args);

  const email = args.email;
  const googleId = args.googleId;
  const name = args.name;
  const idToken = args.idToken;

  const labelerCheck = {
    googleId: googleId,
  };

  const isLabeler = await labelerColl.findOne(labelerCheck);

  const createdAt = new Date().getTime();

  const labelerValue = {
    email: email,
    googleId: googleId,
    name: name,
    idToken: idToken,
    created_at: createdAt,
    value: "",
  };

  if (isLabeler) return labelerValue;
  if (!isLabeler) await labelerColl.insert(labelerValue);

  return labelerValue;
};

const GetAllLabelers = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const result = await labelingColl.find({}).toArray();
  console.log("result: ", result);
  return result;
};

const SearchLabeler = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const id = args._id;
  const _id = new ObjectId(id);

  const labeler = {
    _id: _id,
  };
  console.log("labeler: ", labeler);

  const result = await labelingColl.find(labeler).toArray();
  console.log("result: ", result);

  return result;
};

const SearchLabelerByGId = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const googleId = args.googleId;

  const labeler = {
    googleId: googleId,
  };
  console.log("labeler", labeler);

  const result = await labelingColl.findOne(labeler);
  console.log("result", result);

  return result;
};

const GetLabelersTasks = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const _id = args._id;

  const result = await taskColl
    .find({ labelers: { $elemMatch: { _id: _id } } })
    .toArray();

  console.log("result: ", result);

  return result;
};

const AddTaskToLabeler = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const task = args.name;

  const email = args.email;
  const _id = args._id;

  const labelerValue = {
    email: email,
    _id: _id,
  };

  const taskValue = {
    name: task,
  };

  const result = await taskColl.updateOne(taskValue, {
    $push: { labelers: labelerValue },
  });

  console.log("result", result);
  console.log("labelerValue: ", labelerValue);

  return taskValue;
};

const DeleteLabelers = async (_, args) => {
  try {
    const labelingColl = await db.connectDB("labeling");

    const id = args._id;
    const _id = new ObjectId(id);

    const labelerValue = {
      _id: _id,
    };

    const result = await labelingColl.deleteMany(labelerValue);
    console.log("labeler: ", [labelerValue]);

    return [labelerValue];
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

const DeleteTaskOfLabeler = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const task = args.name;

  const email = args.email;
  const _id = args._id;

  console.log("args: ", args);

  const labelerValue = {
    email: email,
    _id: _id,
  };
  console.log("labelerValue: ", labelerValue);

  const taskValue = {
    name: task,
  };
  console.log("taskValue: ", taskValue);

  const result = await taskColl.updateOne(taskValue, {
    $pull: { labelers: labelerValue },
  });
  console.log("result", result);

  return [labelerValue];
};

module.exports = {
  LabelerLogIn,
  GetAllLabelers,
  SearchLabeler,
  SearchLabelerByGId,
  GetLabelersTasks,
  AddTaskToLabeler,
  DeleteLabelers,
  DeleteTaskOfLabeler,
};
