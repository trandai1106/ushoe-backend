var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    encrypted_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "SALE", "CUSTOMER"]
    },
    address: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        default: Date
    }
});
module.exports = mongoose.model('User', User);