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
    console.log("Got request for persons");
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    console.log(`Asked for id ${id}`);
    console.log("Found person", person);
    if (person) {
        response.json(person);
    } else {
        response.sendStatus(404);
    }
}) 

app.get("/info", (request, response) => {
    console.log("Got request for info page");
    response.send(`
    <p> Phonebook currently contains details of ${persons.length} people</p>
    <p>Current date: ${new Date()}`);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});