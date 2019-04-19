const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyHourSchema = new Schema({
    openTime: { type: Number, required: false },
    closeTime: { type: Number, required: false },
    // secondOpenTime: { type: Number, required: false },
    // secondCloseTime: { type: Number, required: false },
})

// Setting a schema virtual property for whether or not the restaurant is Open 
DailyHourSchema.virtual('isOpen').get(() => {
    return this.openTime !== null;
})

const WeeklyHourSchema = new Schema({
    mon: DailyHourSchema,
    tue: DailyHourSchema,
    wed: DailyHourSchema,
    thu: DailyHourSchema,
    fri: DailyHourSchema,
    sat: DailyHourSchema,
    sun: DailyHourSchema
})

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: false },
    hours: { type: WeeklyHourSchema, required: true },
    priceRange: { type: Number, required: true }, // value of 1 to 4 (dollar signs)
    pictureURL: { type: String, required: false },
    currentOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    pastOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    menuID: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        required: true
    },
    // foodListings: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'food-listing',
    //     required: true
    // }]
    // type: { type: String, required: true },
    // dietary: { type: String, required: true },
})

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;