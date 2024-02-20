const express = require('express');
const note = require('../controllers/NoteControllers');
const routes = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', isAuthenticated, note.getNote);
routes.get('/:id', isAuthenticated, note.getNote);
routes.post('/', [
    check('title')
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    // Add validation for other fields as needed
], isAuthenticated, note.createNote);
routes.put('/:id', [
    check('title')
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    // Add validation for other fields as needed
], isAuthenticated, note.updateNote);
routes.delete('/:id', isAuthenticated, note.deleteNote);

module.exports = routes;

