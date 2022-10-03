const DB = require("../models/db");

const db = new DB();

// const Labeler = async (_, args, context, info) => {
//   const labelingColl = await db.connectDB("labeling");

//   const labeler = args.labeler;
//   console.log("labeler: ", labeler);
//   const result = await labelingColl.find({ labeler }).toArray();
//   console.log("result: ", result);

//   return result;
// };

const DeleteLabelers = async (_, labelers) => {
  try {
    const labelingColl = await db.connectDB("labeling");
    console.log("labeler: ", labelers);

    const result = await labelingColl.deleteMany(labelers);
    console.log("labeler: ", [labelers]);
    return [labelers];
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

const DeleteTaskOfLabeler = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

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

  const result = await labelingColl.updateOne(labelerValue, {
    $pull: { task: taskValue },
  });
  console.log("result", result);
  console.log("labelerValue2: ", labelerValue);

  return [labelerValue];
};

const Labelers = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");

  const result = await labelingColl.find({}).toArray();
  console.log("result: ", result);
  return result;
};

const Tasks = async () => {
  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.find().toArray();

  console.log(result);

  return result;
};

const AddTask = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.findOne({ name: args.name })

  console.log(result);

  if (result === null) {
    await taskColl.insertOne(args);
    return args;
  } else {
    throw new Error("Duplicate Name!");
  };
};

const GetTaskDetail = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.findOne({ name: args.name });

  console.log(args);

  return result;
};

const GetTasksByLabeler = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.find({labelers: {$elemMatch: {labeler: args.labeler}}}).toArray();

  console.log(result);
  
  return result;
};

const DeleteTask = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  await taskColl.deleteOne({ name: args.name });

  console.log(args);

  return args;
};

const UpdateTask = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  const check = await args.newName;

  if (!check) {
    await taskColl.updateOne({ name: args.name },
      {
        $set: args
      })
    console.log("args:", args)
    return await taskColl.findOne({ name: args.name });
  } else {
    await taskColl.updateOne({ name: args.name },
      {
        $set: { name: check }
      })
    return await taskColl.findOne({ name: check });
  };
};

module.exports = {
  Labelers,
  // Labeler,
  Tasks,
  DeleteLabelers,
  DeleteTaskOfLabeler,
  AddTask,
  GetTaskDetail,
  DeleteTask,
  UpdateTask,
  GetTasksByLabeler,
};
