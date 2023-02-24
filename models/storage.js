var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Storage = new Schema({
    branch_id: {
        type: mongoose.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    batch_number: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    import_quantity: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_import_price: {
        type: Number,
        required: true
    },
    importer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imported_at: {
        type: Date,
        default: Date.now,
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

module.exports = mongoose.model('Storage', Storage);