const { ObjectId } = require('mongodb');
const mongodb = require('../db/db');
const { validationResult } = require('express-validator');

const collection = 'user';

const getUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const id = req.params.id || null;
        let result = null;

        if (id) {
            result = await mongodb.getDatabase().db().collection(collection).find({ _id: new ObjectId(id) });
            result.toArray().then((Users) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Users)
            });
        } else {
            // console.log(await mongodb.getDatabase().db().listCollections().toArray());
            result = await mongodb.getDatabase().db().collection(collection).find();
            result.toArray().then((Users) => {
                res.setHeader(`Content-Type`, `application/json`)
                res.status(200).send(Users)
            });
        }

    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).send('Internal Server Error');
    }
}

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            birthday: req.body.birthday,
            phone: req.body.phone,
            address: req.body.address,
            occupation: req.body.occupation
        }

        const response = await createDbUser(user);
        //console.log(response);
        if (response.acknowledged) {
            res.status(200).send(response);
        } else {
            res.status(500).send(response.error || 'There was an error creating the user.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

const createDbUser = async (user) => {
    console.log(user.gitHubUser)
    const newUser = await gitHubUserExist(user.gitHubUser)
    console.log(newUser)
    if (!newUser) {
        const response = await mongodb.getDatabase().db().collection(collection).insertOne(user);
        console.log("created")
        return response
    }
    return false
}


const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const id = req.params.id;
        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            birthday: req.body.birthday,
            phone: req.body.phone,
            address: req.body.address,
            occupation: req.body.occupation
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        const response = await mongodb.getDatabase().db().collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: user });
        if (response.acknowledged) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'There was an error updating the user.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    console.log(req.session.user._json.login)
    // const id = new ObjectId(req.params.id)
    // const response = await mongodb.getDatabase().db().collection(collection).deleteOne({ _id: id }, true);

    // if (response.deletedCount > 0) {
    //     res.status(200).send('Item deleted');
    // } else {
    //     res.status(500).json(response.error || 'There was an error deleting the user');
    // }
}

const gitHubUserExist = async (gitHubUser) => {

    try {
        let exist = false;
        let result = null;

        if (gitHubUser) {
            result = await mongodb.getDatabase().db().collection(collection).find({ gitHubUser: gitHubUser }).toArray();
            //console.log(result);
            exist = Boolean(result.length);
        }

        return exist;

    } catch (error) {
        console.error('Error getting data:', error);
        return false;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    gitHubUserExist,
    createDbUser
}