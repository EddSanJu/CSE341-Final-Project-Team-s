const axios = require('axios');

describe("Función Obtener Usuarios", () => {
    test("Obtener los users", async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            const users = response.data;

            const expectedUserFormat = {
                "_id": expect.any(String),
                "birthday": expect.any(String),
                "email": expect.any(String),
                "lastname": expect.any(String),
                "name": expect.any(String),
                "phone": expect.any(String),
            };

            // Asegurar que la respuesta contenga al menos un usuario con el formato correcto
            expect(users).toEqual(expect.arrayContaining([expect.objectContaining(expectedUserFormat)]));
        } catch (error) {
            // Manejar errores de Axios
            console.error('Error en la solicitud HTTP:', error.message);
            throw error; // Lanzar el error nuevamente para que la prueba falle
        }
    });
});