const express = require('express');
const routes = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged In as ${req.session.user.displayName}` : 'Logged Out | Welcome to AGENDA API');
});
routes.use('/users', require('./users'))

//calling the swagger routes here swagger don't generate the routes api-docs
routes.use('/api-docs', swaggerUI.serve)
routes.use('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = routes;