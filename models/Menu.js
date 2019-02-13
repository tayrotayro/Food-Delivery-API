const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    categoryDescription: { type: String, required: false },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'menu-item',
    }]
})

const MenuSchema = new Schema({
    menuDescription: { type: String, required: false },
    categories: [CategorySchema]
})

const Menu = mongoose.model('menu', MenuSchema);

module.exports = Menu;
