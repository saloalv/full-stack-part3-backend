const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Password needed as first command-line argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook-rw:${password}@fullstack2019-aj7rg.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser : true});

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
});

const PhonebookEntry = mongoose.model("Phonebook entry", phonebookSchema);

if (process.argv.length === 3) {
    PhonebookEntry.find({}).then(result => {
        console.log("Entries:");
        result.forEach(entry => {
            console.log(entry);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    
    const entry = new PhonebookEntry({
        name,
        number
    });
    entry.save().then(result => {
        console.log(`Saved ${name} with number ${number} to the database`);
        mongoose.connection.close();
    })
} else {
    console.log("Invalid amount of parameters, specify either only password or password, name and number to add");
    process.exit(1);
}