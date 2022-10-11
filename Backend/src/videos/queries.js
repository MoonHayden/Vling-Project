const { ObjectId } = require("mongodb");
const DB = require("../../models/db");
const db = new DB();

const GetRandomVideo = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");
  let result;
  
  //3ro check
  // await videoColl.updateMany({ labeler: { $size: 3 }, $set: {check: true}});

  //labeler value false => true
  //task status => true

  do {
    result = await videoColl
      .aggregate([
        {
          $match: { taskName: args.taskName },
        },
        {
          $sample: { size: 1 },
        },
      ])
      .toArray();
  } while (
    result[0].labeler.find((el) => el._id == args.labeler) != undefined ||
    result[0].in_progress.length === 3
  );

  await videoColl.updateOne({
    _id: result[0]._id
  },
    {
      $push: {
        in_progress: { name: args.labeler }
      }
    }
  );

  console.log(result[0])
  return result[0];
};

const AddCategoryValue = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videos");

  await videoColl.updateOne(
    {
      _id: ObjectId(args._id),
    },
    {
      $push: {
        labeler: {
          _id: args.labeler,
        }
      },
    }
  );

  await videoColl.updateOne(
    {
      _id: ObjectId(args._id),
    },
    {
      $push: {
        label: { name: args.label }
      }
    });

  await videoColl.updateOne({
    _id: ObjectId(args._id)
  },
    {
      $pull: {
        in_progress: { name: ObjectId(args.labeler)}
      }
    }
  );

  return true;
};

module.exports = {
  GetRandomVideo,
  AddCategoryValue,
};