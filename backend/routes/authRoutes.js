const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

router.post('/createuser',
    // Check validation using express - validator.
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ], 
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ error: "Sorry, a user with this email already exists." })
            }
            const { name, email, password } = req.body;
            user  = new User({ name, email, password });
            await user.save()
            res.json(user);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Some error occoured!");
        }
    }
)

module.exports = router;