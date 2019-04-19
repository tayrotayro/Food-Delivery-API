const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

router.post('/api/create-owner/:id', function (req, res) {

    const newOwner = new Owner({
        baseUserId: req.params.id,
        restaurants: []
    })

    Owner.find({ baseUserId: req.params.id })
    .count()
    .then(count => {
        if (count > 0) {
            res.send({
                message: "You are already an owner!",
                data: null
            })
        } else {
            newOwner.save()
                .then(() => {
                    res.send({
                        message: "Owner succesfully created!",
                        data: newOwner
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