const csv = require('csvtojson');
const DB = require("../models/db");
const db = new DB();

const csvFilePath = '../csvFiles/1608021709.0.ALL.9624.0 오전 1.28.25.csv';

const csvToDb = async () => {
const collection = await db.connectDB("videos");
csv()
    .fromFile(csvFilePath)
    .then(csvData => {
        console.log(csvData);
        collection.insertMany(csvData).then(function() {
            console.log("DATA INSERTED");
            return "Done";
        }).catch(function (error){
            console.log(error);
        });
    });
};

csvToDb();

module.exports = { csvToDb };