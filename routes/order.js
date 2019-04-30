var express = require('express');
var router = express.Router();
var moment = require('moment');
const Order = require('../models/Order');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');


//Creates an order from user view --Taylor
router.post('/api/order/', function (req, res) {
    //Create a new cart for every order
    const newCart = new Cart({
        total: req.body.total,

    })

    const restaurantId = req.body.restaurantId;
    const userId = req.body.userId;

    const newOrder = new Order({
        deliveryAddress: req.body.deliveryAddress,
        isAccepted: req.body.isAccepted,
        orderTime: moment(),
        customer: req.body.customer,
        cartId: req.body.cartId
    })

    if (!restaurantId || !userId) {
        res.send({
            error: "missing restaurant Id or userId!",
            data: null
        })
    } else {

        Promise.all([
            newOrder.save(),
            User.findByIdAndUpdate(userId, { $push: { currentOrders: newOrder._id } }),
            Restaurant.findByIdAndUpdate(restaurantId, { $push: { currentOrders: newOrder._id } })
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