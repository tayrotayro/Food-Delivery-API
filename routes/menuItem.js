var express = require('express');
var router = express.Router();
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const Menu = require('../models/Menu');


// This item creates a menu item --Tayro
router.post('/api/menu-item', function (req, res) {
    const categoryId = req.body.categoryId;

    const newMenuItem = new MenuItem({
        name: req.body.name,
        description: req.body.description,
        basePrice: req.body.basePrice,
        // pictureURL: req.body.pictureURL,
        customization: req.body.customization
    })
    Promise.all([
        newMenuItem.save(),
        MenuCategory.findByIdAndUpdate(categoryId, { $push: { items: newMenuItem._id } })
    ])
        .then(() => {
            res.send({
                message: "Menu Item successfully created",
                data: newMenuItem
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})
// This route pull all menu items on a menu


module.exports = router;