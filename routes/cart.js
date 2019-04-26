var express = require('express');
var router = express.Router();
const Cart = require('../models/Cart');

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

module.exports = router;