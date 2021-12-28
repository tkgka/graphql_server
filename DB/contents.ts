import mongoose from "mongoose"
const { Schema } = mongoose;
const contentSchema: any = new Schema({
  ServerURL: {
    type: String,
    required: true,
    index: true
  },
  Client: {
    type: String,
    required: true
  },
  UserAgentData: {
    type: [Object],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('server_conn_counts', contentSchema);