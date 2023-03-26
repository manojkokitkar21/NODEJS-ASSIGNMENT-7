const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let initialData = require('./InitialData');

let studentRecords = initialData;

// GET request
app.get('/api/student', (req, res) => {
    res.status(200).json(studentRecords);
});

app.get('/api/student/:id', (req, res) => {
    let id = Number(req.params.id);
    let student = studentRecords.find(student => student.id === id);
    if (!student) {
        res.status(404).send('Invalid student ID');
    } else {
        res.status(200).json(student);
    }
});

// POST request
app.post('/api/student', (req, res) => {
    let { name, currentClass, division } = req.body;
    if (!name || !currentClass || !division) {
        res.status(400).send('Incomplete student details');
    } else {
        let id = studentRecords.length + 1;
        studentRecords.push({ id, name, currentClass, division });
        res.status(200).json({ id });
    }
});

// PUT request
app.put('/api/student/:id', (req, res) => {
    let id = Number(req.params.id);
    let student = studentRecords.find(student => student.id === id);
    if (!student) {
        res.status(400).send('Invalid student ID');
    } else {
        let { name } = req.body;
        if (!name) {
            res.status(400).send('Incomplete update details');
        } else {
            student.name = name;
            res.status(200).send('Student record updated successfully');
        }
    }
});

// DELETE request
app.delete('/api/student/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = studentRecords.findIndex(student => student.id === id);
    if (index === -1) {
        res.status(404).send('Invalid student ID');
    } else {
        studentRecords.splice(index, 1);
        res.status(200).send('Student record deleted successfully');
    }
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   