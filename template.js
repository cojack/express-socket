const app = require('express')();
const port = process.env.NODE_PORT || 3000;
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');
let loader = new TwingLoaderFilesystem('./templates');
let twing = new TwingEnvironment(loader);

app.get('/', async (req, res) => {
    const output = await twing.render('hello.twig', {'name': 'World'});
    res.end(output);
});

app.get('/name/:name', function (req, res) {
    twing.render('hello.twig', req.params).then((output) => {
        res.end(output);
    });
});

app.listen(port, () => {
    console.log('Node.js Express server listening on port '+port);
});
