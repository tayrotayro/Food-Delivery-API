var express = require('express');
var router = express.Router();
const Driver = require('../models/Driver');
const User = require('../models/User');

// This route creates a driver from the user view --Taylor --testing complete
router.post('/api/create-driver/:id', function (req, res) {

    const newDriver = new Driver({
        baseUserId: req.params.id,
        restaurants: []
    })

    Driver.findOne({ baseUserId: req.params.id })
        .count()
        .then(driver => {
            if (driver > 0) {
                res.send({
                    message: "You are already an driver!",
                    data: null
                })
            } else {
                newDriver.save()
                    .then(() => {
                        res.send({
                            message: "You are now a driver!",
                            data: driver
                        })
                    })
                    .catch((err) => {
                        res.send({
                            message: err.message,
                            data: null
                        })
                    })
                }
            })

});
    
   
module.exports = router;