const DB = require("../../models/db");

const db = new DB();

const GetVideos = async (_, args, context, info) => {
    const videoColl = await db.connectDB("videos");

    const result = await videoColl.find({ taskName: args.taskName }).toArray();

    console.log(result);

    return result;
};

const GetRandVideo = async (_, args, context, info) => {
    const videoColl = await db.connectDB("videos");
    // let randVideo
    const randVideo = videoColl.aggregate(
        [ { $sample: { size: 1 } } ]
     );
    console.log(randVideo)
    // do {
    // }while(randVideo.labelers.find((el) => el == args.labeler) == undefined);

    return args;
};

module.exports = {
    GetVideos,
    GetRandVideo,
};
