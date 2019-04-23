const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'menu-item',
    }]
})

const MenuSchema = new Schema({
    categories: [CategorySchema]
})

const Menu = mongoose.model('menu', MenuSchema);

module.exports = Menu;