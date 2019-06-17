const express = require("express");
const app = express();

const persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendick",
        number: "39-23-6423122",
        id: 4
    }
];

app.get("/api/persons", (request, response) => {
    console.log("Got request")
    response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});