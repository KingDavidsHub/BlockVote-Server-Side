const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  election: {
    type: mongoose.Types.ObjectId,
    ref: "Election",
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  age: {
    type: Number,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);
