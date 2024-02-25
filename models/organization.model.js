const mongoose = require('mongoose')
const crypto = require("crypto");
const uuidv1 = require('uuidv1');

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    encry_password: {
        type: String,
        trim:true
    },
    salt:String,
    isVerified: {
        type: Boolean,
        default: false
    },
    
},
{ timestamps: true }
);

organizationSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

organizationSchema.methods = {
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

module.exports = mongoose.model('Organization', organizationSchema)