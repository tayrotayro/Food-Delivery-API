var express = require('express');
var router = express.Router();
var moment = require('moment');
const Order = require('../models/Order');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Transaction = require('../models/Transaction');
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const Driver = require('../models/Driver');


//Creates an order from user view --Taylor **NOT TESTED**
router.post('/api/order', function (req, res) {
    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;

    const newAddress = new Address({
        name: req.body.name,
        addressLine1: req.body.al1,
        addressLine2: req.body.al2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    })

    const newOrder = new Order({
        deliveryAddress: newAddress._id,
        isAccepted: false,
        orderTime: moment(),
        cartId: req.body.cartId

    })

    const newTransaction = new Transaction({
        orderId: newOrder._id,
        cardNumber: req.body.cardNumber,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear,
        ccv: req.body.ccv,
        // billingAddress: req.body.billingAddress
    })


    const newCart = new Cart({

    })

    if (!restaurantId || !userId) {
        res.send({
            error: "missing restaurant Id or userId!",
            data: null
        })
    } else {

        Promise.all([
            newOrder.save(),
            newAddress.save(),
            newTransaction.save(),
            User.findByIdAndUpdate(userId, { $push: { currentOrders: newOrder._id } }),
            Restaurant.findByIdAndUpdate(restaurantId, { $push: { currentOrders: newOrder._id } }),
            User.findByIdAndUpdate(userId, { $set: { cartId: newCart._id } })
        ])
            .then(() => {
                res.send({
                    message: "Order has succesfully been placed!",
                    data: newOrder
                })
            })
            .catch(err => {
                res.send({
                    error: err.message,
                    data: null
                })
            })
    }
})


//This route accepts an order from restaurant view --Taylor
router.put('/api/isAccepted/:id', function (req, res) {
    const orderId = req.params.id;

    Order.findByIdAndUpdate(orderId, { $set: { isAccepted: true, acceptTime: moment() } })
        .then(accept => {
            res.send({
                message: "the order has been accepted!",
                data: accept
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

//This route declines an order from restaurant view --Taylor
router.put('api/isDeclined/:id', function (req, res) {
    const orderId = req.params.id;

    const updateDeclined = {
        isAccepted: false,
        rejectTime: moment()
    }

    /*pull out of current order from both restaurants and users and 
    push into past order of both restaurants and user*/

    Order.findByIdAndUpdate(orderId, { $set: { isAccepted: updateDeclined } })
        .then(declined => {
            res.send({
                message: "the order has been accepted!",
                data: declined
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})


//This route updates the ready time of the order --Taylor
router.put('/api/ready-time/:id', function (req, res) {
    const orderId = req.params.id;

    Order.findByIdAndUpdate(orderId, { $set: { readyTime: moment() } })
        .then(update => {
            res.send({
                message: "Order ready Time succesfully updated!",
                data: update
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

//This route updates the enroute time of the order --Taylor
router.put('/api/enroute-time/:id', function (req, res) {
    const orderId = req.params.id;

    Order.findByIdAndUpdate(orderId, { $set: { enrouteTime: moment() } })
        .then(update => {
            res.send({
                message: "Order enroute Time succesfully updated!",
                data: update
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

//This route updates the delivrd time of the order --Taylor
router.put('/api/delivered-time/:id', function (req, res) {
    const orderId = req.params.id;
    const driverId = req.body.driverId;
    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;


    Promise.all([
        Order.findByIdAndUpdate(orderId, { $set: { deliveredTime: moment() } }),
        
        Driver.findByIdAndUpdate(driverId, { 
            $pull: { activeOrders: orderId },
            $push: { completedOrders: orderId } 
        }),

        Restaurant.findByIdAndUpdate(restaurantId, { 
            $pull: { currentOrders: orderId },
            $push: { pastOrders: orderId }
        }),

        User.findByIdAndUpdate(userId, {
            $pull: { currentOrders: orderId },
            $push: { pastOrders: orderId }
        })

    ])
        .then(update => {
            res.send({
                message: "Order delivered Time succesfully updated!",
                data: update
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

//This pulls all available orders that have been accepted by restaurant --Taylor
router.get('api/available-driver', function (req, res) {
    Order.find({ isAccepted: true })
        .then(order => {
            res.send({
                message: "All active orders are found!",
                data: order
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