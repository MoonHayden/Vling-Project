const { ObjectId } = require("mongodb");
const DB = require("../../models/db");

const db = new DB();

const Tasks = async () => {
  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.find().toArray();

  console.log(result);

  return result;
};

const AddTask = async (_, args, context, info) => {

  const taskColl = await db.connectDB("tasks");

  const result = await taskColl.findOne({ name: args.name });
  
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

  const result = await taskColl.find({ labelers: { $elemMatch: { labeler: args.labeler } } }).toArray();

  console.log(result);

  return result;
};

const DeleteTask = async (_, args, context, info) => {
  const taskColl = await db.connectDB("tasks");
  const videoColl = await db.connectDB("videos");

  await taskColl.deleteOne({ name: args.name });
  
  await videoColl.deleteMany({taskName: args.name});
  
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
  Tasks,
  AddTask,
  GetTaskDetail,
  DeleteTask,
  UpdateTask,
  GetTasksByLabeler,
};
