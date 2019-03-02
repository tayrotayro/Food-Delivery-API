const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/api/signin', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).send({
                    error: "User authentication failed: user doesn't exist!"
                })
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Remove password from user object before sending it back with the respond
                    // Temporarily remove this because of the simplicity of the app
                    // let returnUserData = Object.assign({}, user._doc);
                    // delete returnUserData['password'];
                    res.send({
                        message: `Welcome back`,
                        data: user
                    })
                } else {
                    res.status(401).send("User authentication failed: wrong password!");
                }
            }
        })
        .catch((err) => {
            res.status(401).send("User authentication failed");
        })
})

module.exports = router;