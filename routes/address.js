var express = require('express');
var router = express.Router();
const Address = require('../models/Address');
const User = require('../models/User');

router.post('/api/address', function (req, res) {
    const userId = req.body.userId;

    const newAddress = new Address({
        name: req.body.name,
        addressLine1: req.body.al1,
        addressLine2: req.body.al2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    })

    Promise.all([
        newAddress.save(),
        User.findByIdAndUpdate(userId, { $push: { address: newAddress._id } }
    )])
        .then(() => {
            res.send({
                message: "Address successfully saved!",
                data: newAddress
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})


module.exports = router;