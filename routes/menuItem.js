var express = require('express');
var router = express.Router();
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const Menu = require('../models/Menu');


// this route get a menu item
router.get('/api/menu-item/get/:id', function (req, res) {
    MenuItem.findById(req.params.id)
        .then(menuItem => {
            res.send({
                message: "Menu Item successfully retrieved",
                data: menuItem
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})

// This item creates a menu item --Tayro
router.post('/api/menu-item', function (req, res) {
    const menuId = req.body.menuId;
    const newMenuItem = new MenuItem({
        name: req.body.name,
        description: req.body.description,
        basePrice: req.body.basePrice,
        pictureUrl: req.body.pictureUrl,
        //customization: req.body.customization
    })
    Promise.all([
        newMenuItem.save(),
        Menu.findByIdAndUpdate(menuId, { $push: { items: newMenuItem._id } })
    ])
        .then(item => {
            res.send({
                message: "Menu Item successfully created",
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


// This route pull all menu items on a menu  **TESTED and WORKS**
router.get('/api/menu-item/:id', function (req, res) {
    const menuId = req.params.id;
    Menu.findById(menuId)
        .populate('items')
        .then(response => {
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

//This route deletes a menu item --Taylor
router.put('/api/delete-item/:id', function (req, res) {
    const menuItemId = req.params.id;
    const menuId = req.body.menuId;

    Promise.all([
        MenuItem.findByIdAndDelete(menuItemId),
        Menu.findByIdAndUpdate(menuId, { $pull: { items: menuItemId } })
    ])
        .then(response => {
            res.send({
                message: "Succesfully deleted item!",
                data: null
            })
        })
        .catch(err => {
            res.send({
                error: err.message,
                data: null
            })
        })
})


//This route updates menu items
router.put('/api/menu-item/:id', function (req, res) {
    const menuItemId = req.params.id;

    const updatedMenuItem = {
        name: req.body.name,
        description: req.body.description,
        basePrice: req.body.basePrice,
        pictureUrl: req.body.pictureUrl
    }

    MenuItem.findByIdAndUpdate(menuItemId, { $set: updatedMenuItem })
        .then(response => {
            res.send({
                message: "Menu Item succesfully updated!",
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