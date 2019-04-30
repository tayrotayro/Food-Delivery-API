const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    cardNumber: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    ccv: { type: String, required: true },
    billingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'address',
        require: true
    }
})

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;