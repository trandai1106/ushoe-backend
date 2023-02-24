var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Order = new Schema({
    customer_id: {
        type: mongoose.Types.ObjectId
    },
    customer_name: {
        type: String
    },
    customer_phone: {
        type: String
    },
    products: [{
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
        },    
        quantity: {
            type: Number,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        discount_amount: {
            type: Number,
            default: 0
        }
    }],
    branch_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },
    status: {
        type: Number,
        require: true,
        default: 0
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
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', Order);