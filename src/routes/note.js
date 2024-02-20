const express = require('express');
const note = require('../controllers/NotesController');
const routes = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', isAuthenticated, note.getNote);
routes.get('/:id', isAuthenticated, note.getNote);
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
    check('priority')
        .isString()
        .isIn(['low', 'medium', 'high']),
    check('status')
        .isString()
        .isIn(['pending', 'completed']),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .isString()
        .isLength({ max: 50 })
], isAuthenticated, note.createNote);
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
    check('priority')
        .isString()
        .isIn(['low', 'medium', 'high']),
    check('status')
        .isString()
        .isIn(['pending', 'completed']),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .isString()
        .isLength({ max: 50 })
], isAuthenticated, note.updateNote);
routes.delete('/:id', isAuthenticated, note.deleteNote);

module.exports = routes;
