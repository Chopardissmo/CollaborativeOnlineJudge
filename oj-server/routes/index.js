const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    //send index.html to start client side
    res.sendFile('index.html', { root: path.join(__dirname, '../../public/') });
});

router.get('/problems', (req, res) => {
    //send index.html to start client side
    res.sendFile('index.html', { root: path.join(__dirname, '../../public/') });
});

module.exports = router;