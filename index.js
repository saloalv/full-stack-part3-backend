const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let persons = [
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

app.post("/api/persons/", (request, response) => {
    const receivedPerson = request.body;
    console.log("Received person", receivedPerson);

    // defensively creating new person so that user can't sneak anything in
    const newPerson = {
        name: receivedPerson.name,
        number: receivedPerson.number,
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    }
    console.log("New person", newPerson);
    persons = [...persons, newPerson];
    console.log("Persons after addition", persons);
    response.sendStatus(201);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    console.log(`Received request to remove person with id ${id}`);
    console.log("State before", persons);
    persons = persons.filter(p => p.id !== id);
    console.log("State afterwards", persons);
    response.sendStatus(204);
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