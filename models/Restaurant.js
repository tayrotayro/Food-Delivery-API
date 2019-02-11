const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    hours: { type: Date, required: true },
    pictureURL: { type: String, required: false },
    ownerID: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    menuID: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        required: true
    },
    type: { type: String, required: true },
    price: { type: String, required: true },
    foodListings: [{
        type: Schema.Types.ObjectId,
        ref: 'food listing',
        required: true
    }],
    currentOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    }],
    pastOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    }]
})

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;