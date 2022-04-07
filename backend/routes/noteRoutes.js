const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const mongoose = require('mongoose');

router.get('/fetchnotes',
    fetchUser,
    async (req, res) => { 
        try {
            let userId = req.user.id;
            const notes = await Note.find({user: userId});
            res.json(notes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

router.post('/addnote',
    fetchUser,
    // Check validation using express - validator.
    [
        body('title', 'Enter a valid title.').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters.').isLength({ min: 5 }),
    ], 
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tags } = req.body;
            let note  = new Note({ title, description, tags, user: req.user.id });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

router.put('/updatenote/:id',
    fetchUser,
    async (req, res) => {
        try {
            const { title, description, tags } = req.body;
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tags) newNote.tags = tags;
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found!");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed!");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({note});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

router.delete('/deletenote/:id',
    fetchUser,
    async (req, res) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(404).send("Not Found!");
            }
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found!");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed!");
            }
            await Note.findByIdAndDelete(req.params.id);
            res.send("Note Deleted Successfully!");
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)
module.exports = router;