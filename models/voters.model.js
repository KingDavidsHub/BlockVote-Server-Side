const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encry_password: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  election: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
});

voterSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

voterSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "Input a strong password";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return err.message;
    }
  },
};

module.exports = mongoose.model("Voter", voterSchema);
