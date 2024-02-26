const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    }
},
{timestamps: true}
);

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
      })
      .get(function () {
        return this._password;
      });

userSchema.methods = {
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