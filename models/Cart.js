const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ItemInCartSchema = new Schema({
//     menuItemId: {
//         type: Schema.Types.ObjectId,
//         ref: 'menu-item',
//         required: true
//     },
//     selectedOptions: [{ type: String, require: false }],
//     specialInstructions: { type: String, required: false },
//     quantity: { type: Number, required: true },
//     total: { type: Number, required: true }
// })

const CartSchema = new Schema({
    items: [{
        menuItemId: { type: Schema.Types.ObjectId, required: true },
        selectedOptions: [{ type: String, required: false }],
        specialInstructions: { type: String, required: false },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true }
        
    }],
    cartTotal: { type: Number, required: false }
})

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;