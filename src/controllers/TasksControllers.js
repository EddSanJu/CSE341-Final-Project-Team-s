const { ObjectId } = require('mongodb');
const mongodb = require('../db/db');
const { validationResult } = require('express-validator');

const collection = 'tasks';

const getTasks = async (req, res) => {
    // #swagger.tags = ['Tasks']
    try {
        const id = req.params.id || null;
        let result = null;

        if (id) {
            result = await mongodb.getDatabase().db().collection(collection).find({ _id: new ObjectId(id) });
            result.toArray().then((Tasks) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Tasks)
            });
        } else {
            // console.log(await mongodb.getDatabase().db().listCollections().toArray());
            result = await mongodb.getDatabase().db().collection(collection).find();
            result.toArray().then((Tasks) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Tasks)
            });
        }

    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createTask = async (req, res) => {
    // #swagger.tags = ['Tasks']

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        const task = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            priority: req.body.priority,
            status: req.body.status
        }

        const response = await mongodb.getDatabase().db().collection(collection).insertOne(task);
        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the task.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const updateTask = async (req, res) => {
    // #swagger.tags = ['Tasks']
    try {
        const id = req.params.id;
        const task = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            priority: req.body.priority,
            status: req.body.status
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: task });
        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the task.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

const deleteTask = async (req, res) => {
    // #swagger.tags = ['Tasks']
    const id = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: id }, true);

    if (response.deletedCount > 0) {
        res.status(200).send('Item deleted');
    } else {
        res.status(500).json(response.error || 'There was an error deleting the task');
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}