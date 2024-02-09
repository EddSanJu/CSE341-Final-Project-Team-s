const express = require('express');
const connectDB = require('./db')
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send(`API Docs available at route "URL/api/docs"`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})