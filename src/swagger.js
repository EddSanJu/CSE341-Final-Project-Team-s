const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const swaggerAutogen = require('swagger-autogen')();
const host = 'localhost:3000';
const schemas = ['http', 'https'];

// const host = 'crud-agenda-2hjq.onrender.com';
// const schemas = ['https'];

const doc = {
    info: {
        title: 'Task Manager App',
        description: 'Retrieve data for an authenticated user through web tokens making REST requests GET, POST, PUT, DELETE from a Tasks database in MongoDB.'
    },
    host: host,
    schemes: schemas
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']


swaggerAutogen(outputFile, endpointsFiles, doc)