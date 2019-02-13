const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    deliveryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    expectedDeliveryTime: { type: Date, required: true },
    orderTime: { type: Date, required: true },
    readyTime: { type: Date, required: false },
    pickedUpTime: { type: Date, required: false },
    deliveredTime: { type: Date, required: false },
    // customerID: { type: String, required: true },  //TODO: reference customer and driver ID
    // driverID: { type: String, required: true },
    cartID: { type: String, required: true },
    restaurantID: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    }
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;