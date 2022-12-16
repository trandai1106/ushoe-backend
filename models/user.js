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