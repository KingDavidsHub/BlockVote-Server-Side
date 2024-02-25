const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }, 
    isUsed: {
        type: Boolean,
        default: false
    },
    email:{
        type: String,
    }, 
    expiryDate: {
        type: Date
    }
})

module.exports = mongoose.model("Token", tokenSchema)