const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: false },
    hours: { type: Date, required: true }, //TODO: Implement Hours schema
    pictureURL: { type: String, required: false },
    menuID: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        required: true
    },
    // type: { type: String, required: true },
    price: { type: Number, required: true }, // 1-4 dollar signs
    foodListings: [{
        type: Schema.Types.ObjectId,
        ref: 'food-listing',
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