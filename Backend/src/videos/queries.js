const { ObjectId } = require("mongodb");
const DB = require("../../models/db");
const db = new DB();

const GetRandomVideo = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videosTest");
  let result;

  const check = await videoColl.find()
  //3ro check
  //labeler value false => true
  //task status => true

  do {
    result = await videoColl.aggregate([
      {
        $match: { taskName: args.taskName }
      },
      {
        $sample: { size: 1 }
      }
    ]).toArray();
  } while (result[0].labeler.find(el => el._id == args.labeler) != undefined || result[0].in_progress.length === 3);

  return result[0];
};

const AddCategoryValue = async (_, args, context, info) => {
  const videoColl = await db.connectDB("videosTest");

  await videoColl.updateOne(
    {
      _id: ObjectId(args._id)
    },
    {
      $push: {
        labeler: {
          _id: ObjectId(args.labeler),
        }
      },
    });

  await videoColl.updateOne({
    _id: ObjectId(args._id)
  },
    {
      $push: {
          label: { name: args.label }
        }
    });


  return true;
};

module.exports = {
  GetRandomVideo,
  AddCategoryValue,
};
