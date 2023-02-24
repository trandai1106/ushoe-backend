var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Product = new Schema({
    branches_id: {
        type: [String],
        required: true
    },
    start_time: {
        type: Number,
        require: true
    },
    end_time: {
        type: Number,
        require: true
    },
    product_id: {
        type: mongoose.Types.ObjectId
    },
    discount_percent: {
        type: Number
    },
    discount_amount: {
        type: Number
    },
    discount_price: {
        type: Number
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