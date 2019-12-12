const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello from my router');
});

router.post('/', (req, res) => {
    res.send('Hello from my post router');
});

module.exports = router;
