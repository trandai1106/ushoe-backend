var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var District = new Schema({
    name: {
        type: String,
        required: true, 
    },
    type: {
        type: String,
        required: true, 
    },
    province_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Province'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('District', District);