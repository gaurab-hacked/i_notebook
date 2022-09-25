const express = require("express");
const route = express.Router();
const Note = require("../model/Note");
const fetchuser = require("../middleware/fetchuser");

//Route 1: /api/note/fetch :GET  [register/login require]
route.get("/fetchNote", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error, msg: "Server error" })
    }
})

//Route 2: /api/note/uploadnote :POST  [register/login require]
route.post("/uploadNote", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, discription, category } = req.body;
        const note = new Note({ userId, title, discription, category });
        await note.save();
        res.json({ success: "Note saved success", note:note });
    } catch (error) {
        res.status(500).json({ error, msg: "Server error" })
    }
})

//Route 3: /api/note/deleteNote:Id :DELETE  [register/login require]
route.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // first we have to check this note actually exist or not
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) return res.json({msg:"Sorry, Note not exist"});
        //check the owner of this note
        const userId = req.user.id;
        if (userId !== note.userId.toString()) return res.json({msg:"Sorry you change something please enter valid credentials"});
        //check note and delete it
        await Note.findByIdAndDelete(noteId);
        res.json({ success: "delete success" });
    } catch (error) {
        res.status(500).json({ error, msg: "Server error" })
    }
})

//Route 3: /api/note/update:Id :PUT  [register/login require]
route.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, discription } = req.body;
        //make newNote object and put value
        const newNote = {};
        if (title) { newNote.title = title };
        if (discription) { newNote.discription = discription };
        //first check note exist or not
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) return res.json({msg:"Note not found"});
        //check ownership of note
        const userId = req.user.id;
        if (userId !== note.userId.toString()) return res.json({msg:"Access denide"});
        //find note and update
        const updatedNote = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        res.json({update:"update success", updatedNote});
    } catch (error) {
        res.status(500).json({ error, msg: "Server error" })
    }
})


module.exports = route;