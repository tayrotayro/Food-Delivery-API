const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

//Become an owner from user view --Taylor
router.post('/api/create-owner/:id', function (req, res) {

    const newOwner = new Owner({
        baseUserId: req.params.id,
        restaurants: []
    })

    Owner.findOne({ baseUserId: req.params.id })
        .count()
        .then(owner => {
            if (owner > 0) {
                res.send({
                    message: "You are already an owner!",
                    data: null
                })
            } else {
                newOwner.save()
                    .then(() => {
                        res.send({
                            message: "You are now a owner!",
                            data: owner
                        })
                    })
                    .catch((err) => {
                        res.send({
                            message: err.message,
                            data: null
                        })
                    })
                }
            })

});
//     if (Owner.findOne({ baseUserId: req.params.id }) != null) {
//         res.send({
//             message: "You are already an owner",
//             data: null
//         })

//     } else {
//         const newOwner = new Owner({
//             baseUserId: req.params.baseUserId,
//             restaurants: []
//         })

//         newOwner.save()
//         .then(newOwner => {
//             res.send({
//                 message: "Successfully become an owner",
//                 data: newOwner
//             })
//         })
//         .catch(err => {
//             res.send({
//                 message: err.message,
//                 data: null
//             })
//         })
//     }  
// });


module.exports = router;