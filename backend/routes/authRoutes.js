const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    const user  = new User({ name, email, password });
    user.save();
    res.send("Hello");
})

module.exports = router;