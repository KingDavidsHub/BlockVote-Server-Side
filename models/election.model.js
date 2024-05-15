const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    candidates: [
      {
        type: Object,
      },
    ],
    registeredVoters: [
      {
        email: {
          type: String,
          required: true,
        },
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
      },
    ],
    duration: {
      type: Number,
      default: 5000,
    },
    organization: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", electionSchema);
