import mongoose from "mongoose"
//const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV == "production" ? ".env" : ".env"
  ),
});
const MONGO_URL = `mongodb+srv://root:${process.env.passwd}@cluster0.ywtqd.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;
// Connect to mongoDB
module.exports = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected')
  }).catch(err => {
    console.log(err);
  });
}
