const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//connecting to DB
mongoose.connect("mongodb://127.0.0.1:27017/NoteInCloude");


// use express middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/note", require("./routes/note"));


app.listen(4000, ()=>console.log("server started in 4000 port"));