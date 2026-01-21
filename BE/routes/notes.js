const express = require("express");
const router = express.Router();
const {createNote,getNote, getNotebyID , updateNote , deleteNote} = require("../controllers/createNote")


router.post("/createNote", createNote);
router.get("/getNotes", getNote);
router.get("/getNote/:id", getNotebyID);
router.patch("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

module.exports= router;