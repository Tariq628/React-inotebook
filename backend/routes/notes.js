const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
// Route 1: get all notes using: GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

// Route 2: add a new note using: GET "api/auth/addnote". Login required
router.post("/addnote", fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 15 characters").isLength({
            min: 15,
        }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({ title, description, tag, user: req.user.id });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        }
    }
);


// Route 03: Update an existing note using PUT, Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //  create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // find a note to be updated, update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

// Route 04: Delete an existing note using DELETE, Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        // find a note to be deleted, delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted", note: note });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");

    }
});
module.exports = router;
