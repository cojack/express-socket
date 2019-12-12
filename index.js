const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/', function (req, res) {
    res.send('Post World')
});

app.get('/avast/:name', (req, res) => {
    res.send(`Hello ${req.params.name} Avast`);
});


app.listen(3000);
