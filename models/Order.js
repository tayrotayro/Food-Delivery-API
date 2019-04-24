const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    deliveryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    // expectedDeliveryTime: { type: Date, required: true }, 
    // is this expected delivery time estimated by the restaurant
    // or the expected delivery time set out by customers?
    isAccepted: { type: Boolean, required: true },
    orderTime: { type: Date, required: true },
    readyTime: { type: Date, required: false },
    enrouteTime: { type: Date, required: false },
    actualDeliveryTime: { type: Date, required: false },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver',
        required: false
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    totalPrice: { type: Number, required: true },
    tip: { type: Number, required: false }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;