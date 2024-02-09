const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = process.env.DB_URI;
    await mongoose.connect(URI);
    console.log('Connected to MongoDB DB cluster');
  } catch (error) {
    console.error('Unable to connecto to DB: ', error);
    process.exit(1);
  }
};

module.exports = connectDB;
