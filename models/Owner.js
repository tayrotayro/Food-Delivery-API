const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    baseUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }]
})

const Owner = mongoose.model('owner', OwnerSchema);

module.exports = Owner;