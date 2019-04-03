const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

router.post('/api/owner/:baseUserId', function (req, res) {
    const newOwner = new Owner({
        baseUserId: req.params.baseUserId,
        restaurants: []
    })

    newOwner.save()
        .then(newOwner => {
            res.send({
                message: "Successfully become an owner",
                data: newOwner
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            })
        })
})

module.exports = router;