const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuCategorySchema = new Schema({
    name: { type: String, required: true },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'menu-item',
    }]
})

const MenuCategory = mongoose.model('menu-category', MenuCategorySchema);

module.exports = MenuCategory;