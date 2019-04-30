const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomizationOptionSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false }
})

const CustomizationSchema = new Schema({
    title: { type: String, required: true },
    isRequired: { type: Boolean, required: true },
    canChooseMultiple: { type: Boolean, required: true },
    options: [CustomizationOptionSchema]
})

const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    pictureUrl: { type: String, required: false },
    //customization: [CustomizationSchema],
})

const MenuItem = mongoose.model('menu-item', MenuItemSchema);

module.exports = MenuItem;