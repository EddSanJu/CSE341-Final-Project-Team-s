const { check } = require('express-validator');

const newNoteValidation = [
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
        .isIn(['low', 'medium', 'high'])
        .withMessage('The Priority should be low, pending or completed'),
    check('status')
        .isString()
        .isIn(['pending', 'completed'])
        .withMessage('status should be pending or completed'),
    check('dueDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .isString()
        .isLength({ max: 50 })
];

const updateNoteValidation = [
    check('title')
        .optional()
        .isString()
        .isLength({ min: 3, max: 25 }),
    check('description')
        .optional()
        .isString()
        .isLength({ max: 255 }),
    check('category')
        .optional()
        .isString()
        .isLength({ max: 50 }),
    check('priority')
        .optional()
        .isString()
        .isIn(['low', 'medium', 'high'])
        .withMessage('The Priority should be low, pending or completed'),
    check('status')
        .optional()
        .isString()
        .isIn(['pending', 'completed'])
        .withMessage('status should be pending or completed'),
    check('dueDate')
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('The date format should be YYYY-MM-DD'),
    check('assignedTo')
        .optional()
        .isString()
        .isLength({ max: 50 })
];

module.exports = {
    newNoteValidation,
    updateNoteValidation
};