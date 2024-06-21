const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const offersSchema = new Schema({
    carID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Model: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    
    Discount: {
        type: Number,  
        required: true
    },
   
    Image: {
        type: String,
        required: true
    }
  
}, { timestamps: true });


const Offers = mongoose.model('Offer', offersSchema);
module.exports = Offers;