const ProductGroup = require('../models/productGroup');
const Product = require('../models/product');
const security = require('../utils/security');
const dataValidation  = require('../utils/dataValidation');

const checkProductExist = async (productId) => {
    const isExist = await Product.exists({ _id: productId });
    return isExist;
};

const getProductsInGroup = async (productGroupId) => {
    let productsInGroup = [];

    const products = await Product.find({ group_id: productGroupId });
    products.forEach(product => {
        productsInGroup.push({
            _id: product._id,
            product_code: product.product_code,
            size: product.size,
            unit_sell_price: product.unit_sell_price
        });
    });

    return productsInGroup;
};
const getProductById = async (product_id) => {
    const product = await Product.findById(product_id);
    return product;
}
const createProduct = async (product_code, size, unit_sell_price, group_id) => {
    await Product.create({product_code, size, unit_sell_price, group_id});
}
const updateProduct = async (id, product_code, size, unit_sell_price, group_id) => {
    await Product.findByIdAndUpdate(id, {product_code, size, unit_sell_price, group_id});
}
const deleteProduct = async (id) => {
    await Product.findByIdAndDelete(id);
}
module.exports = {
    checkProductExist,
    getProductsInGroup,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};