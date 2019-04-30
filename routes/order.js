var express = require('express');
var router = express.Router();
var moment = require('moment');
const Order = require('../models/Order');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Transaction = require('../models/Transaction');
const Cart = require("../models/Cart");


//Creates an order from user view --Taylor **NOT TESTED**
router.post('/api/order/', function (req, res) {
    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;

    const newOrder = new Order({
        deliveryAddress: req.body.deliveryAddress,
        isAccepted: req.body.isAccepted,
        orderTime: moment(),
        customer: req.body.customer,
        cartId: req.body.cartId
    })

    const newTransaction = new Transaction({
        orderId: req.body.orderId,
        cardNumber: req.body.cardNumber,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear,
        ccv: req.body.ccv,
        billingAddress: req.body.billingAddress
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


//This route defines weather an order is accepted or rejected --Taylor
router.put('/api/accept-reject/:id', function (req, res) {
    const orderId = req.params.id;

    const updatedOrder = {
        isAccepted: req.body.isAccepted
    }
    
    if (req.params.id) {
        Order.findByIdAndUpdate(orderId, { $set: updatedOrder })
            .then(order => {
                res.send({
                    message: "Order sucessfully accepted!",
                    data: order
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

//This route accepts an order 
router.put('api/isAccepted/:id', function (req, res) {
    const orderId = req.params.id;

    const updateAccepted = {
        isAccepted: req.body.isAccepted
    }

    Order.findByIdAndUpdate(orderId, { $set: { isAccepted: updateAccepted }})
        .then(accepted => {
            res.send({
                message: "the order has been accepted!",
                data: accepted
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
} )

//This route declines an order 
router.put('api/isDeclined/:id', function(req, res) {
    const orderId = req.params.id;

    const updateDeclined = {
        isAccepted: req.body.isAccepted
    }

    Order.findByIdAndUpdate(orderId, { $set: { isAccepted: updateAccepted }})
    .then(accepted => {
        res.send({
            message: "the order has been accepted!",
            data: accepted
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