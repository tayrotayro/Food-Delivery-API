const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    baseUserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    // isActive: { type: Boolean, required: true },
    activeOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    completedOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }]
})

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;