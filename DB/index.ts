import mongoose from "mongoose"
//const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
import env from "../env"

const MONGO_URL = `mongodb+srv://root:${env.passwd}@cluster0.ywtqd.mongodb.net/${env.database}?retryWrites=true&w=majority`;
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
