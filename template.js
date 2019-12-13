const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
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
    req.io.broadcast('onRegister', {user: req.body});
    const output = await twing.render('register.twig', req.body);
    res.send(output);
});

app.use('/user', myRouter);

io.on('connection', conn => {
    conn.emit('event', {Hello: 'My Friend'});
    conn.on('message', (data) => {
        console.log('Message', data);
    });
    console.log('someone one connected');
});

io.emit('event2', {message: 'Hello'});

server.listen(port, () => {
    console.log('Node.js Express server listening on port '+port);
});


