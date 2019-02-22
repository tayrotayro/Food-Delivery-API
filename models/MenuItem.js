const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndividualOptionSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false }
})

const CustomizationSchema = new Schema({
    title: { type: String, required: true },
    options: [IndividualOptionSchema]
})

const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pictureUrl: { type: String, required: false },
    customization: [CustomizationSchema],
    extras: [IndividualOptionSchema]
})

const MenuItem = mongoose.model('menu-item', MenuItemSchema);

module.exports = MenuItem;