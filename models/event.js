var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Event = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
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

module.exports = mongoose.model('Event', Event);