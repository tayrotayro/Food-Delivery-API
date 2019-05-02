const express = require('express');
const router = express.Router();
const Driver = require("../models/Driver");
const Order = require ('../models/Order');

//This route creates a driver --Taylor
router.post('/api/driver/:id', function (req, res) {

    const newDriver = new Driver({
        baseUserId: req.params.id
    })

    Driver.find({ baseUserId: req.params.id })
        .count()
        .then(count => {
            if (count > 0) {
                res.send({
                    message: "You are already an driver!",
                    data: null
                })
            } else {
                newDriver.save()
                    .then(() => {
                        res.send({
                            message: "Driver succesfully created!",
                            data: newDriver
                        });
                    })
                    .catch((err) => {
                        res.send({
                            message: err.message,
                            data: null
                        });
                    })
            }
        })
        .catch(err => {
            res.send({
                message: err.message,
                data: null
            });
        })
});


/*This route finds all available orders where isAccepted = true and driver = null
for the driver to accept --Taylor */

router.get('/api/driver/available-orders', function (req, res) {

    Order.find({ isAccepted: true, driver: null })
        .then(response => {
            res.send({
                message: "Successfully found all orders",
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

//This route allows a driver to accept an order --Taylor
router.put('/api/driver/accept-order/:id', function(req, res) {
    const driverId = req.params.id;
    const orderId = req.body.orderId;
    
    Promise.all([
        Driver.findByIdAndUpdate(driverId, { $push: { activeOrders: orderId }}),
        Order.findByIdAndUpdate(orderId, { $set: { driver: driverId}})
    ])
    .then(response => {
        res.send({
            message: "order succesfully accepted!",
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

//This route pulls all the current info on the driver --Taylor
router.get('/api/active-driver/:id', function (req, res) {
    const Id = req.params.id;
    Driver.find({ baseUserId: Id })
        .then(driverInfo => {
            res.send({
                message: "driver info succesfully found!",
                data: driverInfo
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