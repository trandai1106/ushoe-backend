const ProductGroup = require('../models/productGroup');
const Product = require('../models/product');
const security = require('../utils/security');
const dataValidation  = require('../utils/dataValidation');

const checkProductGroupExist = async (productGroupId) => {
    const isExist = await ProductGroup.exists({ _id: productGroupId });
    return isExist;
};


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

const createProductGroup = async (name, images_url, description) => {
    await ProductGroup.create({name, images_url, description});
};
const updateProductGroup = async (id, name, images_url, description) => {
    await ProductGroup.findByIdAndUpdate(id, {name, images_url, description});
};
const deleteProductGroup = async (id) => {
    await ProductGroup.findByIdAndDelete(id);
};


module.exports = {
    checkProductGroupExist,
    getAllProductGroup,
    getProductGroupsOnSale,
    getProductGroupById,
    createProductGroup,
    updateProductGroup,
    deleteProductGroup
};