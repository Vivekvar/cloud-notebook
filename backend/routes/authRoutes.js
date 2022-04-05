const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

router.post('/',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ], 
    (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        const newUser  = new User({ name, email, password });
        newUser.save()
        .then(user => res.json(user))
        .catch(err => {console.log(err)
        res.json({error: 'Please enter a unique value for email.'})})
    }
)

module.exports = router;