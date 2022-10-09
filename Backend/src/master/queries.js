const DB = require("../../models/db");
const bcrypt = require("bcryptjs");

const db = new DB();

const MasterSignUp = async (_, args, context, info) => {
  const masterColl = await db.connectDB("master");

  const name = args.name;

  const hashedPassword = await bcrypt.hash(args.password, 12);
  console.log("hashedPassword: ", hashedPassword);

  const result = await masterColl.insert({ name, hashedPassword });
  console.log("result: ", result);

  return result;
};

const MasterLogIn = async (_, args, context, info) => {
  const masterColl = await db.connectDB("master");

  const name = args.name;
  console.log("name: ", name);
  const password = args.password;
  console.log("password: ", password);

  const isPassword = await masterColl.findOne({ name: "master" });
  console.log("isPassword: ", isPassword.hashedPassword);

  const passwordCheck = await bcrypt.compare(password, isPassword.hashedPassword);

  if (!passwordCheck) return console.log("INVALID_INFO");
  console.log("passwordCheck: ", passwordCheck);

  return passwordCheck;
};

module.exports = {
  MasterSignUp,
  MasterLogIn,
};
