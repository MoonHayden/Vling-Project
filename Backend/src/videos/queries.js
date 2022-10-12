const { ObjectId } = require("mongodb");
const DB = require("../../models/db");
const db = new DB();

const GetRandomVideo = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");
  const taskColl = await db.connectDB("tasks");
  await videoColl.updateMany({ label: { $size: 3 } }, { $set: { check: true } });
  const doneVideos = await videoColl.aggregate([{$match: {$and:[{taskName: args.taskName},{check: true}]}}]).toArray();
  await taskColl.updateOne({name: args.taskName}, {$set:{doneVideos: doneVideos.length}});
  
  const result = await videoColl
    .aggregate([
      {
        $match: {
          $and: [
            {taskName: args.taskName},
            { labeler: { $nin: [args.labeler] } },
            { in_progress: { $nin: [args.labeler]}},
            { check: false }
          ]
        },
      },
      {
        $project: {
          in_progress: 1,
          videoId: 1,
          title: 1,
          category: 1,
          tags: 1,
          tags_str: 1,
          description: 1,
          category_ori: 1,
          category_label: 1,
          taskName: 1,
          category_predict: 1,
          check: 1,
          in_progress: 1,
          labeler: 1,
          label: 1,
          lessThanThree: { $lt: [{ $size: "$in_progress" }, 3] }
        }
      },
      {
        $match: {
          lessThanThree: true 
        }
      },
      {
        $sample: { size: 1 }
      }
    ])
    .toArray();

  if (result[0] == null) {
    throw new Error("할당된 영상이 없습니다. 관리자에게 문의하세요");
  };

  await videoColl.updateOne({
    _id: result[0]._id
  },
    {
      $push: {
        in_progress: args.labeler
      }
    }
  );


  console.log(result[0])
  return result[0];
};

const AddCategoryValue = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");
  
  await videoColl.updateMany({ label: { $size: 3 } }, { $set: { check: true } });
  
  await videoColl.updateOne(
    {
      _id: ObjectId(args._id),
    },
    {
      $push: {
        labeler: args.labeler
      },
    }
  );

  await videoColl.updateOne(
    {
      _id: ObjectId(args._id),
    },
    {
      $push: {
        label: args.label
      }
    });

  return true;
};

module.exports = {
  GetRandomVideo,
  AddCategoryValue,
};