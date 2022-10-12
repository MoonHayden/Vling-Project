const express = require('express');
const router = express.Router();
const multer = require("multer");
const csv = require('csv-parser')
const fs = require('fs');

const DB = require("../models/db");
const db = new DB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("file");

router.post("/upload", (req, res) => {
  let results;
  
  upload(req, res, async (err) => {

    let taskName = req.body.taskName;

    if (err) {
      return res.status(400).json({ success: false, err });
    };

    const csvToDb = async () => {

      const collection = await db.connectDB("videos");
      const taskColl = await db.connectDB("tasks");

      fs.createReadStream(res.req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          const source = {
            taskName: taskName,
            in_progress: [],
            labeler: [],
            label: [],
            majority: "",
            check: false
          };

          const data = results.map(el => { return Object.assign(el, source) });
          await taskColl.updateOne({ name: taskName },
            {$set: {totalVideos: data.length}
          });

          await collection.insertMany(data)
            .then(() => {
              console.log("DB 업로드 끝");
              fs.unlinkSync(res.req.file.path);
            }).catch((error) => {
              console.log(error);
            });
        });
    };

    await csvToDb();
    results = [];

    return res.status(200).json({
      success: true,
      fileName: res.req.file.filename
    });
  });
});

module.exports = router;