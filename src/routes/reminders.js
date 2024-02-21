const express = require('express');
const reminders = require('../controllers/RemindersControllers');
const routes = express.Router();
const { check } = require('express-validator');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', isAuthenticated, reminders.getReminders);

routes.post('/', [
    check('title').isString().isLength({ min: 3, max: 50 }).withMessage('Title must be between 3 and 50 characters'),
    check('description').isString().optional({ nullable: true, checkFalsy: true }).isLength({ max: 255 }).withMessage('Description can have a maximum length of 255 characters'),
    check('date').matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
], isAuthenticated, reminders.createReminder);

routes.put('/:reminderId', isAuthenticated, reminders.updateReminder);

routes.get('/:reminderId', isAuthenticated, reminders.getReminderById);

routes.delete('/:reminderId', isAuthenticated, reminders.deleteReminder);

module.exports = routes;
