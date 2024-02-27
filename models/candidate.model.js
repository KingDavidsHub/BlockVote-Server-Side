const mongoose = require('mongoose')


const candidateSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname:{
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }, 
    image: {
        type: Array,
        required: true
    }
})