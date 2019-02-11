const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'userType' };

const BaseUserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    joinDate: { type: Date, required: true }
})

const BaseUser = mongoose.model('user', BaseUserSchema);

const Customer = BaseUser.discriminator(
    'Customer',
    new Schema({
        currentOrders: [{
            type: Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }],
        pastOrders: [{
            type: Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    }, options)
);

const Driver = BaseUser.discriminator(
    'Driver',
    new Schema({
        isActive: { type: Boolean, required: true },
        currentOrders: [{
            type: Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }],
        pastOrders: [{
            type: Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    }, options)
);

const Owner = BaseUser.discriminator(
    'Owner',
    new Schema({
        restaurants: [{ 
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
            required: false
        }]
    }, options)
)