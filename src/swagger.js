const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const swaggerAutogen = require('swagger-autogen')();
const host = 'localhost:3000';
const schemas = ['http', 'https'];

// const host = 'https://cse341w34lastproject.onrender.com';
// const schemas = ['https'];

const doc = {
    info: {
        title: 'Task Manager App',
        description: 'Retrieve data for an authenticated user through web tokens making REST requests GET, POST, PUT, DELETE from a Tasks database in MongoDB.'
    },
    host: host,
    schemes: schemas,
    securityDefinitions: {
        GitHubOAuth: {
            type: 'oauth2',
            authorizationUrl: process.env.SERVER_URL,
            tokenUrl: process.env.GITHUB_CALLBACK_URL,
            uthorizationUrl: '',
            scopes: {
                getUser: 'Grant access to get all users from the database',
                createUser: 'Grant access to create users in the database',
                updateUser: 'Grant access to update users from the database',
                deleteUser: 'Grant access to delete users from the database',
            },
        },
    },
    security: [
        {
            GitHubOAuth: [],
        },
    ],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']


swaggerAutogen(outputFile, endpointsFiles, doc)