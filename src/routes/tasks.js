const express = require('express');
const tasks = require('../controllers/TasksControllers');
const routes = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', tasks.getTasks);
routes.get('/:id', tasks.getTasks);
routes.post('/', [
    check('title')
        .isString()
        .notEmpty()
        .withMessage('Please enter a title'),
    check('description')
        .isString()
        .notEmpty()
        .isLength({ min: 1, max: 200 })
        .withMessage('Please enter a description. Max characters 50'),
    check('due_date')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .isAfter(new Date().toISOString().split('T')[0])
        .withMessage('Please enter a valid date (e.g. YYYY-MM-DD) equal or greater than this year'),
    check('status')
        .isIn(['Pending', 'In progress', 'Completed'])
        .withMessage('Please enter a valid status: Pending, In progress, or Completed')
], isAuthenticated, tasks.createTask);

routes.put('/:id', [
    check('title')
        .isString()
        .notEmpty()
        .withMessage('Please enter a title')
        .isLength({ min: 1, max: 100 }),
    check('description')
        .isString()
        .notEmpty()
        .isLength({ min: 1, max: 200 })
        .withMessage('Please enter a description. Max characters 50'),
    check('due_date')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .isAfter(new Date().toISOString().split('T')[0])
        .withMessage('Please enter a valid date (e.g. 02/17/2024) equal or greater than this year'),
    check('status')
        .isIn(['Pending', 'In progress', 'Completed'])
        .withMessage('Please enter a valid status: Pending, In progress, or Completed')
], isAuthenticated, tasks.updateTask);

routes.delete('/:id', isAuthenticated, tasks.deleteTask);

module.exports = routes;
