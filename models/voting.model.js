const mongoose = require('mongoose')

const votingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    }, 
    from: {
        typr: Date,
        required: true
    }, 
   to:  {
        type: Date,
        required: true
    }, 
    description: {
        type: String
    }, 
    candidates: {
        
    }
})