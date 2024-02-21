const express = require('express');
const routes = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

routes.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged In as ${req.session.user.displayName}` : 'Logged Out | Welcome to AGENDA API');
});
routes.use('/users', require('./users'));
routes.use('/reminders', require('./reminders'));
routes.use('/tasks', require('./tasks'));

routes.get('/login', passport.authenticate('github'), (req, res) => {
    //  #swagger.tags = ['Authentication'] 
    // #swagger.description = 'The authentication use github validation that response to the callback url, in this case /github/callback, for this reason this endpoint doesn\'t have a response.'
    /*  #swagger.responses[200] = {
       description: 'OK, Github will response to /github/callback with success and the neccesary data',
    }
    #swagger.responses[] = {
        description: 'If failed, then response to the same endpoint and this endpoint will receive the status, 400, 500, etc.',
    } */
});

routes.get('/logout', function (req, res, next) {
    //  #swagger.tags = ['Authentication'] 
    // #swagger.description = 'This endpoint destroy the session if the user is logged in'
    req.logout(function(err) {
        if(err) { return next(err); }
        res.redirect('/');
    })
})

//calling the swagger routes here swagger don't generate the routes api-docs
routes.use('/api-docs', swaggerUI.serve)
routes.use('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = routes;