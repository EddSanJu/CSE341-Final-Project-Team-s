const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const swaggerAutogen = require('swagger-autogen')();
// const host = 'crud-agenda-2hjq.onrender.com';
// const schemas = ['https', 'http'];

const host = 'cse341w34lastproject.onrender.com';
const schemas = ['https', 'http'];

const doc = {
    info: {
        title: 'Team Project API',
        description: 'Team Api'
    },
    host: host,
    schemes: schemas
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']


swaggerAutogen(outputFile, endpointsFiles, doc)