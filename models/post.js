const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  dateCreate: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
