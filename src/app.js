const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/db');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// const connectDB = require('./db/db');

const app = express();
// app.use(express.json());

// connectDB();

// app.get('/', (req, res) => {
//   res.send(`API Docs available at route "URL/api/docs"`);
// });

// Convert a request (POST,GET) to JSON Object
app.use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, z-key')
        res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next();
    })
.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })
    }
});
