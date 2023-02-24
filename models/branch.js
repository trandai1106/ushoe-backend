var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Branch = new Schema({
    name: {
        type: String,
        required: true
    },
    province_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Province',
        required: true
    },
    district_id: {
        type: mongoose.Types.ObjectId,
        ref: 'District',
        required: true
    },
    address_detail: {
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

module.exports = mongoose.model('Branch', Branch);