const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelectedOptionSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false }
})

const ItemInCartSchema = new Schema({
    menuItemId: {
        type: Schema.Types.ObjectId,
        ref: 'menu-item',
        required: true
    },
    selectedOptions: [SelectedOptionSchema],
    specialInstructions: { type: String, required: false }
})

const CartSchema = new Schema({
    items: [ItemInCartSchema]
})

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;