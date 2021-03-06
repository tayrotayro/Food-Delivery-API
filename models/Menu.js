const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'menu-item'
    }]
})

const Menu = mongoose.model('menu', MenuSchema);

module.exports = Menu;