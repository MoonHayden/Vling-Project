const DB = require("../../models/db");
const db = new DB();

const GetRandomVideo = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");

  // const taskName = args.taskName;
  // console.log("taskName: ", args.taskName);

  const taskValue = {
    taskName: args.taskName,
  };
  console.log("taskValue: ", taskValue);

  const result = await videoColl.find(taskValue).toArray();
  console.log("pong!");
  console.log("result: ", result);
  return result;
};

const AddCategoryValue = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");

  console.log("args: ", args);

  const videoValue = {
    videoId: args.videoId,
  };
  console.log("videoValue: ", videoValue);

  const categoryValue = {
    label: args.label,
  };
  console.log("label: ", args.label);

  const result = await videoColl.updateOne(videoValue, {
    $push: { label: categoryValue },
  });

  console.log("result: ", result);

  return categoryValue;
};

module.exports = {
  GetRandomVideo,
  AddCategoryValue,
};
