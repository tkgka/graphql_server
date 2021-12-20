import mongoose from "mongoose"
const { Schema } = mongoose;
const contentSchema: any = new Schema({

  username: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('server_conn_count_accounts', contentSchema);