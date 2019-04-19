const express = require('express');
const router = express.Router();
const Driver = require("../models/Driver");


router.post('/api/create-driver/:id', function (req, res) {

    const newDriver = new Driver({
        baseUserId: req.params.id
    })

    Driver.find({ baseUserId: req.params.id })
        .count()
        .then(count => {
            if (count > 0) {
                res.send({
                    message: "You are already an driver!",
                    data: null
                })
            } else {
                newDriver.save()
                    .then(() => {
                        res.send({
                            message: "Driver succesfully created!",
                            data: newDriver
                        });
                    })
                    .catch((err) => {
                        res.send({
                            message: err.message,
                            data: null
                        });
                    })
            }
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
});

module.exports = router;