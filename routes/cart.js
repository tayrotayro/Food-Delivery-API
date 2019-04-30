var express = require('express');
var router = express.Router();
const Cart = require('../models/Cart');

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

//This route adds a menu item to cart --Tayro
router.put('api/cart/:id', function (req, res) {
    const cartId = req.params.id;

    const menuItemId = {menuItemId: req.body.menuItemId};
  
   // if (cartId) {
        Cart.findByIdAndUpdate(cartId, { $push: { items: menuItemId } })
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
   // } else {
        res.send({
            message: "pass in valid cart Id",
            data: null
        })
  //  }
})

module.exports = router;