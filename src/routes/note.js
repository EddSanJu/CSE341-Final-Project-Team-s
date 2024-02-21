const express = require('express');
const note = require('../controllers/NotesControllers');
const routes = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');
const { newNoteValidation, updateNoteValidation  } = require('../middleware/notesValidation');

routes.get('/', isAuthenticated, note.getNote);
routes.get('/:id', isAuthenticated, note.getNoteById);
routes.post('/', newNoteValidation, isAuthenticated, note.createNote);
routes.put('/:id', updateNoteValidation, isAuthenticated, note.updateNote);
routes.delete('/:id', isAuthenticated, note.deleteNote);

module.exports = routes;
