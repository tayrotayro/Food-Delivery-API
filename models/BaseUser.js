const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'userType' };

// Make sure to pass in options to change discriminatorKey to 'userType'
const BaseUserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
   // joinDate: { type: Date, required: true }
}, options)

// Hash password 'before' save
BaseUserSchema.pre('save', function (next) {
    const user = this;

    if (this.isModified('password') || this.isNew) {
        user.password = bcrypt.hashSync(user.password, salt);
        next();
    } else {
        next();
    }
})

// BaseUser Model
const BaseUser = mongoose.model('user', BaseUserSchema);

// Customer Model
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

// Driver Model
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

// Owner Model
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

module.exports = {
    BaseUser,
    Customer,
    Driver,
    Owner
}