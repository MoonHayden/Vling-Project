const DB = require("../../models/db");
const db = new DB();

const GetRandomVideo = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");

  const taskName = args.taskName;
  console.log("taskName: ", args.taskName);

  const result = videoColl.find({ taskName }).toArray();
  console.log("result: ", result);
  return result;
};

const AddCategoryValue = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");

  const videoValue = {
    videoId: args.videoId,
  };
  console.log("videoValue: ", videoValue);

  const categoryValue = {
    category_predict: args.category_predict,
  };
  console.log("categoryValue: ", categoryValue);

  const result = await videoColl.updateOne(videoValue, {
    $push: { category_predict: categoryValue },
  });

  console.log("result: ", result);
};

module.exports = {
  GetRandomVideo,
  AddCategoryValue,
};
