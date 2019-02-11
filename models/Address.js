const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    name: {type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
})

const Address = mongoose.model('address', AddressSchema);

module.exports = Address;