const mongoose = require("mongoose");
const { Schema } = mongoose;

const handleSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  codeforcesHandle: {
    type: String,
    required: true,
  },
  leetcodeHandle: {
    type: String,
    required: true,
  },
  codechefHandle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Handle = mongoose.model("Handle", handleSchema);

module.exports = Handle;
