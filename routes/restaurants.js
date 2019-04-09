var express = require('express');
var router = express.Router();
const Restaurant = require('../models/Restaurant');
const Owner = require("../models/Owner");

router.post('/api/restaurant/:id', function (req, res) {

    const ownerId = req.params._id;
    const newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        // pictureURL: req.body.pictureURL,
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
    Promise.all([
        newRestaurant.save(),
        Owner.findByIdAndUpdate(req.params.id, { $push: { restaurants:  } })
    ])
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

/* Get restaurants associated with an owner */
router.get('/api/restaurant/:baseUserId', function (req, res) {
    const baseUserId = req.params.baseUserId;

    Owner.find({ baseUserId })
        .then(owners => {
            const restaurants = owners[0].restaurants;

            Restaurant.find({
                '_id': {
                    $in: restaurants
                }
            })
                .then(foundRestaurants => {
                    res.send({
                        message: "Successfully return all restaurants associated with the owner",
                        data: foundRestaurants
                    })
                }).catch(err => {
                    res.send({
                        message: err.message,
                        data: null
                    })
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