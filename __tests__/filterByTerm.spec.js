const axios = require('axios');

describe("Get All Notes", () => {
    test("Obtaining all notes", async () => {
        try {
            const response = await axios.get("http://localhost:3000/notes");
            const notes = response.data;

            const expectedNotesFormat = {
                "_id": expect.any(String),
                "title":  expect.any(String),
                "description":  expect.any(String),
                "category":  expect.any(String),
                "priority":  expect.any(String),
                "status":  expect.any(String),
                "dueDate":  expect.any(String),
                "assignedTo":  expect.any(String)
            };

            expect(notes).toEqual(expect.arrayContaining([expect.objectContaining(expectedNotesFormat)]));
        } catch (error) {
            console.error('Error en la solicitud HTTP:', error.message);
            throw error;
        }
    });
});

describe("Get Specific Notes", () => {
    test("Obtaining an specific note", async () => {
        try {
            const notes = await axios.get("http://localhost:3000/notes");
            const notesResponse = notes.data;
            if(notesResponse.length > 0){
                const response = await axios.get(`http://localhost:3000/notes/${notesResponse[0]._id}`);
                const note = response.data;

                const expectedNotesFormat = {
                    "_id": expect.any(String),
                    "title":  expect.any(String),
                    "description":  expect.any(String),
                    "category":  expect.any(String),
                    "priority":  expect.any(String),
                    "status":  expect.any(String),
                    "dueDate":  expect.any(String),
                    "assignedTo":  expect.any(String)
                };


                expect(note).toEqual([expect.objectContaining(expectedNotesFormat)]);
            }
        } catch (error) {
            console.error('Error en la solicitud HTTP:', error.message);
            throw error;
        }
    });
});

describe("Create Note", () => {
    test("creating a note", async () => {
        try {
            const response = await axios.post("http://localhost:3000/notes", {
                "title": "unit Test",
                "description": "unit Test",
                "category": "unit Test",
                "priority": "low",
                "status": "pending",
                "dueDate": "1993-02-02",
                "assignedTo": "Unit Test"
            });

            expect(response.status).toBe(200);
            expect(response.data).toEqual({
                "acknowledged": true,
                "insertedId": expect.any(String)
            });
        } catch (error) {
            // Manejar errores de Axios
            console.error('Error en la solicitud HTTP:', error.message);
            throw error; // Lanzar el error nuevamente para que la prueba falle
        }
    });
});

describe("Edit Specific Notes", () => {
    test("Editing an specific note", async () => {
        try {
            const notes = await axios.get("http://localhost:3000/notes");
            const notesResponse = notes.data;

            if(notesResponse.length > 0){
                const response = await axios.put(`http://localhost:3000/notes/${notesResponse[0]._id}`, {
                    title:  "NEW EDITED TITLE",
                    description:  notesResponse[0].description,
                    category:  notesResponse[0].category,
                    priority:  notesResponse[0].priority,
                    status:  notesResponse[0].status,
                    dueDate:  notesResponse[0].dueDate,
                    assignedTo:  notesResponse[0].assignedTo
                });

                expect(response.status).toBe(200);
                expect(response.data).toEqual({
                    "acknowledged": expect.any(Boolean),
                    "modifiedCount": expect.any(Number),
                    "upsertedId": null,
                    "upsertedCount": expect.any(Number),
                    "matchedCount": expect.any(Number)
                });
            }
        } catch (error) {
            console.error('Error en la solicitud HTTP:', error.message);
            throw error;
        }
    });
});

describe("Delete Specific Notes", () => {
    test("Eliminating an specific note", async () => {
        try {
            const notes = await axios.get("http://localhost:3000/notes");
            const notesResponse = notes.data;
            if(notesResponse.length > 0){
                const response = await axios.delete(`http://localhost:3000/notes/${notesResponse[0]._id}`);

                expect(response.status).toBe(200);
                expect(response.data).toEqual('Note deleted');
            }
        } catch (error) {
            console.error('Error en la solicitud HTTP:', error.message);
            throw error;
        }
    });
});