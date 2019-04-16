var express = require('express');
var router = express.Router();
const Driver = require('../models/Driver');
const User = require('../models/User');

// This route creates a driver from the user view --Taylor --testing complete
/* Says I am already a driver after deleting the driver in mLab */
router.post('/api/create-driver/:id', function (req, res) {
    if (Driver.find({ baseUserId: req.params.id })) {
        res.send({
            message: "You are already a Driver!",
            data: null
        })
        
    } else {
        const newDriver = new Driver({
            baseUserId: req.params.id
        })
                
        newDriver.save()
        .then(newDriver => {
            res.send({
                message: "You have successfully become a Driver!",
                data: newDriver
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            })
        })
    }  
});

module.exports = router;