var express = require('express');
var router = express.Router();
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const Menu = require('../models/Menu');


// This item creates a menu item --Tayro
router.post('/api/menu-item/', function (req, res) {
    const menuId = req.body.menuId;
    const newMenuItem = new MenuItem({
        name: req.body.name,
        description: req.body.description,
        basePrice: req.body.basePrice,
        pictureURL: req.body.pictureURL,
        //customization: req.body.customization
    })
    Promise.all([
        newMenuItem.save(),
        Menu.findByIdAndUpdate(categoryId, { $push: { items: newMenuItem._id } })
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
router.get('/api/menu-item/:id', function (req, res) {
    const menuId = req.params.id;
    Menu.findById(menuId)
        .then( response => {
            res.send({
                message: "Menu Items succesfully found!",
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

module.exports = router;