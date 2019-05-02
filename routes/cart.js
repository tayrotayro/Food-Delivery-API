var express = require('express');
var router = express.Router();
const Cart = require('../models/Cart');
const User = require('../models/User');

// This route gets a cart
router.get('/api/cart/:id', function (req, res) {
    Cart.findById(req.params.id)
        .then(cart => {
            res.send({
                message: "Cart successfully retrieved",
                data: cart
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
})

// Create an empty cart and assign to user
router.post('/api/cart/reset', function (req, res) {
    const userId = req.body.userId;

    const newCart = new Cart({
        items: []
    })

    Promise.all([
        newCart.save(),
        User.findByIdAndUpdate(userId, { $set: { cartId: newCart._id } })
    ])
        .then(() => {
            res.send({
                message: "Cart successfully reset",
                data: newCart._id
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
})

// This route creates an empty cart  NOT IN USE
router.post('/api/cart/', function (req, res) {
    const newCart = new Cart({
        quantity: req.body.quantity,
        total: req.body.total,
    })

    newCart.save()
        .then(() => {
            res.send({
                message: "Cart successfully created",
                data: newCart
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
})

//This route updates and removes a menu item from cart --Tayro
router.put('/api/update-cart/:id', function (req, res) {
    const cartId = req.params.id;
    const updatedItems = req.body.updatedItems;

    Cart.findByIdAndUpdate(cartId, { $set: { items: updatedItems } })
        .then(item => {
            res.send({
                message: "Item successfully added to cart",
                data: item
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })

})

//This route adds a menu item to cart --Taylor
router.put('/api/add-to-cart/:id', function (req, res) {
    const cartId = req.params.id;

    const newItem = {
        menuItemId: req.body.menuItemId,
        specialInstructions: req.body.specialInstructions,
        quantity: req.body.quantity,
        total: req.body.total
    }

    Cart.findByIdAndUpdate(cartId, { $push: { items: newItem } })
        .then(response => {
            res.send({
                message: "Item succesfully added to cart!",
                data: response
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

//This route deletes a menu item from cart --Taylor
router.put('/api/delete-from-cart/:id', function (req, res) {
    const cartId = req.params.id;
    const itemId = req.body.id;

    if (!cartId || !itemId) {
        res.send({
            error: "Please pass in a valid cart or item Id!",
            data: null
        })
    } else {
        Cart.findByIdAndUpdate(cartId, { $pull: { menuItemId: itemId } })
            .then(response => {
                res.send({
                    message: "succesfully removed item from cart!",
                    data: null
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

module.exports = router;