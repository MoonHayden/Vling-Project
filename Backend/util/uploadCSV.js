const express = require('express');
const router = express.Router();
const multer = require("multer");
const csv = require('csvtojson');

const DB = require("../models/db");
const db = new DB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("file");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    };

    const csvToDb = async () => {
      const collection = await db.connectDB("videos");
      csv() //임시용 
        .fromFile(res.req.file.path)
        .then(csvData => {
          collection.insertMany(csvData)
            .then(() => {
              console.log("DB 업로드 끝\n")
            }).catch(function (error) {
              console.log(error);
            });
        });
    };

    csvToDb();

    return res.status(200).json({
      message: "File Uploaded!",
      success: true,
      path: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;