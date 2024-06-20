const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    
    BuyerEmail: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Car: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders;