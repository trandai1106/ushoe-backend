var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductGroup = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    images_url: {
        type: [String]
    },
    description: {
        type: String
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

module.exports = mongoose.model('ProductGroup', ProductGroup);