var express = require('express');
var router = express.Router();
const Restaurant = require('../models/Restaurant');
const Owner = require("../models/Owner");
const Menu = require("../models/Menu");

//Creates new restaurant --Taylor
router.post('/api/restaurant/:id', function (req, res) {
    const ownerId = req.params.id;

    const newMenu = new Menu({})

    const newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description,
        pictureURL: req.body.pictureURL,
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
        menuID: newMenu._id,
        priceRange: req.body.priceRange
    })

    Promise.all([
        newRestaurant.save(),
        newMenu.save(),
        Owner.findOneAndUpdate({ baseUserId: ownerId }, { $push: { restaurants: newRestaurant._id } })
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

//Gets all restaurants from Database for user home
router.get('/api/find-restaurants', function (req, res) {
    Restaurant.find()
        .then(restaurants => {
            res.send({
                message: "Successfully get all restaurants",
                data: restaurants
            })
        })
        .catch(err => {
            res.send({
                message: "Get all restaurants failed",
                data: err.message
            })
        })
})

//This route updates a restaurant's basic info --Taylor
router.put('/api/restaurant-info/:id', function (req, res) {
    if (req.params.id) {
        const updatedInfo = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            pictureURL: req.body.pictureURL
        }

        Restaurant.findByIdAndUpdate(req.params.id, { $set: updatedInfo })
            .then(() => {
                res.send({
                    message: "Restaurant info sucessfully updated!",
                    data: null
                })
            })
            .catch(err => {
                res.send({
                    message: err.message,
                    data: null
                })
            })
    } else {
        res.send({
            message: "Pass in a valid restaurant ID!",
            data: null
        })
    }
})

//This route pull the user info from the database --Taylor 
router.get('/api/restaurant-info/:id', function (req, res) {
    const restaurantId = req.params.id;

    if(restaurantId) {
        Restaurant.findById(restaurantId)
            .then(restaurantInfo => {
                res.send({
                    message: "Successfully pulled restaurant info!",
                    data: restaurantInfo
                })
            })
            .catch(err => {
                res.send({
                    error: err.message,
                    data: null
                })
            })
    } else {
        res.send({
            error: "invalid restaurant ID!",
            data: null
        })
    }
})

module.exports = router;