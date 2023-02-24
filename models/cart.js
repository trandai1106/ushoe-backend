var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Cart = new Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
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
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', Cart);