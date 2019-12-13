const router = require('express').Router();
const {passwordHash} = require('./helpers');
const {User, userEmitter, sequelize} = require('./db');

router.get('/', (req, res) => {
    sequelize.sync()
        .then(() => User.findAll())
        .then(users => res.send(users));
});

router.get('/:id', (req, res) => {
    sequelize.sync()
        .then(() => User.findByPk(req.params.id))
        .then(user => res.send(user));
});

router.post('/', async (req, res) => {
    await sequelize.sync();
    const password = passwordHash(req.body.password);
    const user = await User.create({
        username: req.body.username,
        birthday: req.body.birthday,
        email: req.body.email,
        password: password
    });
    userEmitter.emit('new-register', user);
    res.send(user);
});

module.exports = router;
