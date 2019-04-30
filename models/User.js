const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;

const BaseUserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinDate: { type: Date, required: true },
    profilePicUrl: { type: String, required: false },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }],
    currentOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    pastOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }]
})

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

const User = mongoose.model('user', BaseUserSchema);

module.exports = User;