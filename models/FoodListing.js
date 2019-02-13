const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodListingSchema = new Schema({
    name: { type: String, required: true }
})

const FoodListing = mongoose.model('food-listing', FoodListingSchema);

module.exports = FoodListing;