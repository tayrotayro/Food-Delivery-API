const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    deliveryAddress: { type: String, required: true },
    orderTime: { type: Date, required: true },
    readyTime: { type: Date, required: true },
    pickedUpTime: { type: Date, required: true },
    deliveredTime: { type: Date, required: true },
    userID: { type: String, required: true },
    driverID: { type: String, required: true },
    expectedDeliveryTime: { type: Date, required: true },
    cartID: { type: String, required: true }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Alert;