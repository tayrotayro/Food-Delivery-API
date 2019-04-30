var express = require('express');
var router = express.Router();
const Cart = require('../models/Cart');

router.post('/api/cart', function (req, res) {
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

//This route adds an item to cart while shopping
router.get('api/cart/:id', function(req, res) {
    const cartId = req.params.id;

    // const orderPlaced = {
    //     menuItemId: req.body.menuItemId,
    //     quantity: req.body.quantity,
    //     total: req.body.total
    // }

    Cart.findOne({_id: req.params.id})
        .then(found => {
            res.send({
                message: "order succesfully added to cart!",
                data: found
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