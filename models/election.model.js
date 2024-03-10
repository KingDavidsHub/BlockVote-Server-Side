const mongoose = require('mongoose')

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    }, 
    from: {
        type: Date,
        required: true
    }, 
   to:  {
        type: Date,
        required: true
    }, 
    description: {
        type: String
    }, 
    candidates: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Candidate'
    }],
    registeredVoters:[{
        email: {
            type: String,
            required: true
        },
        firstname:{
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }, 
        isVerified: {
            type: Boolean,
            default: false
        }
    }]
})

module.exports = mongoose.model("Election", electionSchema)