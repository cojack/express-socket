const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.NODE_PORT || 3000;
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./templates');
let twing = new TwingEnvironment(loader);
const myRouter = require('./user-router');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const output = await twing.render('hello.twig', {'name': 'World'});
    res.end(output);
});

app.get('/name', function (req, res) {
    twing.render('hello.twig', {name: req.query.name})
        .then((output) => {
            res.end(output);
        });
});

app.get('/register', async (req, res) => {
    const output = await twing.render('register.twig');
    res.send(output);
});

app.post('/register', async (req, res) => {
    const output = await twing.render('register.twig', req.body);
    res.send(output);
});

app.use('/user', myRouter);

app.listen(port, () => {
    console.log('Node.js Express server listening on port '+port);
});
