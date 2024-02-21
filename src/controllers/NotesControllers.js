const { ObjectId } = require('mongodb');
const mongodb = require('../db/db');
const { validationResult } = require('express-validator');

const collection = 'notes';

const getNote = async (req, res) => {
    // #swagger.tags = ['Notes']

    try {
        const id = req.params.id || null;
        let result = null;

        if (id) {
            result = await mongodb.getDatabase().db().collection(collection).find({ _id: new ObjectId(id) });
        } else {
            result = await mongodb.getDatabase().db().collection(collection).find();
        }

        result.toArray().then((note) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(note);
        });

    } catch (error) {
        console.error('Error getting data;', error);
        res.status(500).send('Internal Server Error');
    }
};

const getNoteById = async (req, res) => {
     // #swagger.tags = ['Notes']
    const { id: noteId } = req.params;

    try {
        if (noteId) {
            let existingNote = await mongodb.getDatabase().db().collection(collection).findOne({ _id: new ObjectId(noteId) });
            res.status(200).json(existingNote);
        }
    } catch (err) {
        console.log(err instanceof Error);
        console.log('ERROR err', err.message);
        res.status(404).json({
            message: "NOT FOUND"
        });
    }
}

const createNote = async (req, res) => {
        // #swagger.tags = ['Notes']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const note = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo
        };

        const response = await mongodb.getDatabase().db().collection(collection).insertOne(note);

        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the note.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

const updateNote = async (req, res) => {
        // #swagger.tags = ['Notes']
    try {
        const id = req.params.id;

        const note = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: note });

        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the note.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const deleteNote = async (req, res) => {
        // #swagger.tags = ['Notes']
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: id }, true);

        if (response.deletedCount > 0) {
            res.status(200).send('Note deleted');
        } else {
            res.status(500).json(response.error || 'There was an error deleting the note');
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    getNote,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};

