const mongoose = require("mongoose");

const User = mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Users", User);