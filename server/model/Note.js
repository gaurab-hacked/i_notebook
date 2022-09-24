const mongoose = require("mongoose");

const Note = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    discription: String,
    author: String,
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Note", Note);