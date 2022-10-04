const DB = require("../../models/db");

const db = new DB();

const Labelers = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const result = await labelingColl.find({}).toArray();
  console.log("result: ", result);
  return result;
};

const Labeler = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const labeler = args.labeler;
  console.log("labeler: ", labeler);
  const result = await labelingColl.find({ labeler }).toArray();
  console.log("result: ", result);

  return result;
};

const GetLabelersTasks = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const result = await taskColl
    .find({ labelers: { $elemMatch: { labeler: args.labeler } } })
    .toArray();

  console.log("result: ", result);

  return result;
};

const AddTaskToLabeler = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const task = args.name;
  console.log("task: ", task);
  const labeler = args.labeler;
  console.log("labeler: ", labeler);

  const labelerValue = {
    labeler: labeler,
  };

  const taskValue = {
    name: task,
  };

  const result = await taskColl.updateOne(taskValue, {
    $push: { labelers: labelerValue },
  });

  console.log("result", result);
  console.log("labelerValue: ", labelerValue);
};

const DeleteLabelers = async (_, labeler) => {
  try {
    const labelingColl = await db.connectDB("labeling");
    console.log("labeler: ", labeler);

    const result = await labelingColl.deleteMany(labeler);
    console.log("labeler: ", [labeler]);
    return [labeler];
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

const DeleteTaskOfLabeler = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");

  const task = args.name;
  console.log("task: ", task);
  const labeler = args.labeler;
  console.log("labeler: ", labeler);

  const labelerValue = {
    labeler: labeler,
  };

  const taskValue = {
    name: task,
  };

  const result = await taskColl.updateOne(taskValue, {
    $pull: { labelers: labelerValue },
  });
  console.log("result", result);
  console.log("labelerValue2: ", labelerValue);

  return [labelerValue];
};

module.exports = {
  Labelers,
  Labeler,
  GetLabelersTasks,
  AddTaskToLabeler,
  DeleteLabelers,
  DeleteTaskOfLabeler,
};
