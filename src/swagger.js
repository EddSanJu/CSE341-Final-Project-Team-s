const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const swaggerAutogen = require('swagger-autogen')();
// const host = 'localhost:3000';
// const schemas = ['http', 'https'];

const host = 'cse341w34lastproject.onrender.com';
const schemas = ['https'];

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
                //Reminder Scopes
                getReminders: 'Grant access to get all the reminders from the database',
                createReminder: 'Grant access to create a reminder in the database',
                getReminderById: 'Grant access to get a reminder by Id',
                updateReminder: 'Grant access to update a reminder from the database',
                deleteReminder: 'Grant access to delete reminders from the database',
                //User Scopes
                getUser: 'Grant access to get all users from the database',
                createUser: 'Grant access to create users in the database',
                updateUser: 'Grant access to update users from the database',
                deleteUser: 'Grant access to delete users from the database',
                //Tasks Scopes
                getTasks: 'Grant acess to get all taks from the database',
                createTask: 'Grant access to create a task in the database',
                updateTask: 'Grant access to update a task by Id from the database',
                deleteTask: 'Grant access to delete a task from the database',
                //Notes
                getNote: 'Grant access to get all the notes from the database',
                getNoteById: 'Grant access to get a note by Id from the database',
                createNote: 'Grant access to create a note in the database',
                updateNote: 'Grant access to update a note by Id from the database',
                deleteNote: 'Grant access to delete a note by Id from the database',
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