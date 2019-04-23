var express = require('express');
var router = express.Router();
const MenuCategory = require('../models/MenuCategory');
const Menu = require('../models/Menu');

router.post('/api/menu-category', function (req, res) {
    const menuId = req.body.menuId;

    const newMenuCategory = new MenuCategory({
        name: req.body.name,
        items: []
    })

    if (!menuId) {
        res.send({
            error: "Missing menu Id",
            data: null
        })
    } else {
        Promise.all([
            newMenuCategory.save(),
            Menu.findByIdAndUpdate(menuId, { $push: { categories: newMenuCategory._id } })
        ])
            .then(() => {
                res.send({
                    message: "Menu category has successfully been created",
                    data: newMenuCategory
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