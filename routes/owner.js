const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

//Become an owner from user view --Taylor
/* Does not function, always says "You are already an owner"   */
router.post('/api/create-owner/:id', function (req, res) {
    if (Owner.find({ baseUserId: req.params.id })) {
        res.send({
            message: "You are already an owner",
            data: null
        })
        
    } else {
        const newOwner = new Owner({
            baseUserId: req.params.baseUserId,
            restaurants: []
        })
                
        newOwner.save()
        .then(newOwner => {
            res.send({
                message: "Successfully become an owner",
                data: newOwner
            })
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            })
        })
    }  
});


module.exports = router;