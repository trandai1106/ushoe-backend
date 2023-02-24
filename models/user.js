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
    email: {
        type: String
    },
    avatar_url: {
        type: String,
        required: true,
        default: '/avatars/default_avatar.png'
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "SALE", "CUSTOMER"]
    },
    province_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Province'
    },
    district_id: {
        type: mongoose.Types.ObjectId,
        ref: 'District'
    },
    address_detail: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    secret_key_reset_password: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('User', User);