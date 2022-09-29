const { DB } = require("../models/db");

const db = new DB();

const Labelers = async (_, args, context, info) => {
  //   const db = new DB();
  const labelingColl = await db.connectDB("labeling");

  const result = await labelingColl.find({}).toArray();
  return result;
};

const Labeler = async (_, args, context, info) => {
  //   const db = new DB();
  const labelingColl = await db.connectDB("labeling");

  const labeler = args.labeler;
  const result = await labelingColl.find({ labeler }).toArray();
  return result;
};

// const LabelersTask = async (_, args, context, info) => {
//     const db = new DB();
//     const labelingColl = await db.connectDB("labeling");

//     const labeler = args.labeler
// }

const Task = async (_, args, context, info) => {
  //   const db = new DB();
  const taskColl = await db.connectDB("task");

  const result = await taskColl.find({}).toArray();
  return result;
};

const DeleteLabelers = async (_, labeler) => {
  try {
    // const db = new DB();
    const labelingColl = await db.connectDB("labeling");

    const result = await labelingColl.deleteMany(labeler);
    console.log("result: ", result);
    return [labeler];
  } catch (err) {
    `Delete Labelers Error: ${err}`;
  }
};

// const UpdateTaskLabeler = async (_, args, context, info) => {
//   const db = new DB();
//   const taskColl = await db.connectDB("task");

//   console.log("args: ", args);
//   const taskName = args.taskName;
//   console.log("taskName: ", taskName);
//   const taskLabeler = args.taskValue;
//   console.log("taskLabeler: ", taskLabeler);
//   //   console.log("taskLabeler: ", taskLabeler);

//   const taskValues = {
//     taskLabeler: taskLabeler,
//   };
//   console.log("taskValue: ", taskValue);
//   const result = await taskColl.updateOne({ $set: taskValues });
//   console.log("result: ", result);

//   return result;
// };

const AddTaskToLabeler = async (_, args, context, info) => {};

const UpdateTaskLabeler = async (_, { _id, labeler }, context, info) => {
  //   const db = new DB();
  const taskColl = await db.connectDB("task");

  let taskValues = {
    labeler: labeler,
  };

  console.log("taskValues1: ", taskValues);

  await taskColl.updateOne({ _id, _id }, { $set: taskValues });

  taskValues._id = _id;

  console.log("taskValues2: ", taskValues);

  return taskValues;
};

const DeleteTaskOfLabeler = async (_, args, context, info) => {
  const labelingColl = await db.connectDB("labeling");
  console.log("args: ", args);
  const task = args.name;
  console.log("task: ", task);
  const labeler = args.labeler;
  console.log("labeler: ", labeler);
  if (labeler) await labelingColl.deleteOne(task);
  console.log("task: ", task);

  //   const result = await labelingColl.deleteOne(task);
  //   console.log("result: ", result);
  //   return result;
};

// async updateItem(_, { _id, itemName, itemPrice, itemImage, itemCategoryId }) {
//     let itemValues = {
//       itemName: itemName,
//       itemPrice: itemPrice,
//       itemImage: itemImage,
//       itemCategoryId: itemCategoryId,
//     };

//     try {
//       await Items.update({ _id, _id }, { $set: itemValues });

//       itemValues._id = _id;

//       return itemValues;
//     } catch (error) {
//       throw `updateItem Error: ${error}`;
//     }
//   },

module.exports = {
  Labelers,
  Labeler,
  Task,
  AddTaskToLabeler,
  DeleteLabelers,
  UpdateTaskLabeler,
  DeleteTaskOfLabeler,
};
