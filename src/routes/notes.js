const express = require('express');
const notes = require('../controllers/NotesControllers');
const routes = express.Router();
const { check } = require('express-validator');

const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', notes.getNote);
routes.get('/:id', notes.getNote);
routes.post('/', [
    check('title')
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('description')
        .isString()
        .isLength({ max: 255 }),
    check('category')
        .isString()
        .isLength({ max: 50 }),
    check('status')
        .isString()
        .isIn(['pending', 'completed']),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .isString()
        .isLength({ max: 50 })
], notes.createNote);
routes.put('/:id', [
    check('title')
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('description')
        .isString()
        .isLength({ max: 255 }),
    check('category')
        .isString()
        .isLength({ max: 50 }),
    check('status')
        .isString()
        .isIn(['pending', 'completed']),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .isString()
        .isLength({ max: 50 })
], notes.updateNote);
routes.delete('/:id', notes.deleteNote);

module.exports = routes;
