const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Mobile: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);
module.exports = Users;