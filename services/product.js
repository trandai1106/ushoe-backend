const ProductGroup = require('../models/productGroup');
const Product = require('../models/product');
const security = require('../utils/security');
const dataValidation  = require('../utils/dataValidation');

//#region check exist
const checkProductGroupExist = async (productGroupId) => {
    const isExist = await ProductGroup.exists({ _id: productGroupId });
    return isExist;
};
const checkProductExist = async (productId) => {
    const isExist = await Product.exists({ _id: productId });
    return isExist;
};
//#endregion


//#region Product Group
const getAllProductGroup = async () => {
    const productGroups = await ProductGroup.find();
    return productGroups;
};
const getProductGroupsOnSale = async () => {
    const productGroupsOnSale = await ProductGroup.find({ status: 1 });
    return productGroupsOnSale;
};
const getProductGroupById = async (productGroupId) => {
    const productGroup = await ProductGroup.findById(productGroupId);
    return productGroup;
};
//#endregion


//#region Product
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
//#endregion

module.exports = {
    checkProductGroupExist,
    checkProductExist,

    getAllProductGroup,
    getProductGroupsOnSale,
    getProductGroupById,

    getProductsInGroup,
    getProductById
};