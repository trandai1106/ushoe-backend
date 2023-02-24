var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Product = new Schema({
    product_code: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    unit_sell_price: {
        type: Number,
        required: true
    },
    group_id: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductGroup',
        required: true
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

module.exports = mongoose.model('Product', Product);