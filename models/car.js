const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carSchema = new Schema({
    carID: {
        type: String,
        required: false,
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
    Color: {
        type: String,
        required: true
    },
    Engine: {
        type: String,
        required: true
    },
    Power: {
        type: String,
        required: true
    },
    Transmission: {
        type: String,
        required: true
    },
    Fuel: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
    
    
    
    
    
    
}, { timestamps: true });

const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;