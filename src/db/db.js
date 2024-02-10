const dotenv = require('dotenv');
dotenv.config();

const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.DB_URI;
let database
const initDb = (callback) => {
    
    if (database) {
        console.log(`Database is already initiated!`)
        return callback(null, database)
    }
    MongoClient.connect(url)
        .then((client) => {
            database = client
            callback(null, database)
        })
        .catch((err) => {
            callback(err)
        })
}

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database
}

const getCollection = async (collectionName, id = null) => {
    try {
        // Use connect method to connect to the server
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const collection = db.collection(collectionName);
        if (id) {
            return collection.findOne({_id: new ObjectId(id)});
        }
        return collection.find().toArray();
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

const insertDocument = async (collectionName, documentData) => {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(documentData);
        return result;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

const updateDocument = async (collectionName, id, documentData) => {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const collection = db.collection(collectionName);

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: documentData }
        )
        return result;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

const deleteDocument = async (collectionName, id) => {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const collection = db.collection(collectionName);

        const result = await collection.deleteOne({ _id: new ObjectId(id)});
        return result;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

module.exports = {
    initDb,
    getDatabase,
    getCollection,
    insertDocument,
    updateDocument,
    deleteDocument
}