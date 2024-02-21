const { ObjectId } = require('mongodb');
const mongodb = require('../db/db');
const { validationResult } = require('express-validator');
const { response } = require('express');

const collection = 'reminders';

const getReminders = async (req, res) => {
    // #swagger.tags = ['Reminders']
    try {
        const reminderId = req.params.reminderId || null;
        let result = null;

        if (reminderId) {
            result = await mongodb.getDatabase().db().collection(collection).find({ _id: new ObjectId(reminderId) });
            result.toArray().then((reminders) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(reminders)
            });
        } else {
            result = await mongodb.getDatabase().db().collection(collection).find();
            result.toArray().then((reminders) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(reminders)
            });
        }

    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createReminder = async (req, res) => {
    // #swagger.tags = ['Reminders']

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        const reminder = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
        }

        const response = await mongodb.getDatabase().db().collection(collection).insertOne(reminder);
        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the reminder.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const getReminderById = async (req, res) => {
    // #swagger.tags = ['Reminders']

    try {
        const reminderId = req.params.reminderId;
        const reminder = await mongodb.getDatabase().db().collection(collection).findOne({ _id: new ObjectId(reminderId) });

        if (reminder) {
            res.status(200).json(reminder);
        } else {
            res.status(404).json({ error: 'Reminder not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

const updateReminder = async (req, res) => {
    console.log(req.body)
    // #swagger.tags = ['Reminders']
    try {
        const id = req.params.reminderId;
        const reminder = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
        }
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: reminder });
        console.log(response)
        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the reminder.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

}

const deleteReminder = async (req, res) => {
    // #swagger.tags = ['Reminders']

    const reminderId = new ObjectId(req.params.reminderId)
    const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: reminderId }, true);

    if (response.deletedCount > 0) {
        res.status(200).send('Reminder deleted');
    } else {
        res.status(500).json(response.error || 'There was an error deleting the reminder');
    }
}

module.exports = {
    getReminders,
    createReminder,
    getReminderById,
    updateReminder,
    deleteReminder
}
