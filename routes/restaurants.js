var express = require('express');
var router = express.Router();
const Restaurant = require('../models/Restaurant');

router.post('/api/owner/restaurant', function (req, res) {
    const newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        hours: {
            mon: {
                openTime: req.body.monHour[0],
                closeTime: req.body.monHour[1]
            },
            tue: {
                openTime: req.body.tueHour[0],
                closeTime: req.body.tueHour[1]
            },
            wed: {
                openTime: req.body.wedHour[0],
                closeTime: req.body.wedHour[1]
            },
            thu: {
                openTime: req.body.thuHour[0],
                closeTime: req.body.thuHour[1]
            },
            fri: {
                openTime: req.body.friHour[0],
                closeTime: req.body.friHour[1]
            },
            sat: {
                openTime: req.body.satHour[0],
                closeTime: req.body.satHour[1]
            },
            sun: {
                openTime: req.body.sunHour[0],
                closeTime: req.body.sunHour[1]
            },
        },
        currentOrders: [],
        pastOrders: [],
        priceRange: req.body.priceRange
    })

    newRestaurant.save()
        .then(() => {
            res.send({
                message: "Restaurant successfully created",
                data: newRestaurant
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
})

module.exports = router;