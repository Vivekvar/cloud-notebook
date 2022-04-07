const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET="thisisasecret";
const fetchUser = require('../middleware/fetchUser');

router.post('/createuser',
    // Check validation using express - validator.
    [
        body('name', 'Enter a valid name.').isLength({ min: 3 }),
        body('email', 'Enter a valid email.').isEmail(),
        body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 }),
    ], 
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry, a user with this email already exists." })
            }
            const { name, email, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);
            user  = new User({ name, email, password: secPassword });
            await user.save()
            // Signing a token using jwt
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

router.post('/login',
    // Check validation using express - validator.
    [
        body('email', 'Enter a valid email.').isEmail(),
        body('password', 'Password cannot be blank.').exists(),
    ], 
    async (req, res) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: "Please enter your correct credentials." })
            }
            const passwordCompare = await bcrypt.compare(req.body.password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please enter your correct credentials." })
            }
            // Signing a token using jwt
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

router.post('/getuser',
    fetchUser,
    async (req, res) => {
        try {
            let userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error!");
        }
    }
)

module.exports = router;