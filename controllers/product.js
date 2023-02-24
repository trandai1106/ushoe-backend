const productService = require('../services/product');
const productGroupService = require('../services/productGroup');
const dataValidation = require('../utils/dataValidation');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');

const getProductsByGroup = async (req, res) => {
    const { group_id } = req.params;
    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(group_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(group_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    
    const isExistProductGroup = await productGroupService.checkProductGroupExist(group_id);
    if (!isExistProductGroup) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }
    const productsInGroup = await productService.getProductsInGroup(group_id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get products in group successful',
        data: {
            products: productsInGroup
        }
    });
};

const createProduct = async (req, res) => {
    const { product_code, size, unit_sell_price, group_id } = req.body;
    
    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ product_code, size, unit_sell_price, group_id ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(group_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    
    const isExistProductGroup = await productGroupService.checkProductGroupExist(group_id);
    if (!isExistProductGroup) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }

    await productService.createProduct(product_code, size, unit_sell_price, group_id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create product successful'
    });
};

const updateProduct = async (req, res) => {
    const { product_code, size, unit_sell_price, group_id } = req.body;
    const id = req.params.id;
    
    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ id, product_code, size, unit_sell_price, group_id ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id)
                                && dataValidation.isMongooseObjectId(group_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await productService.checkProductExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product not found'
        });
    }
    const isExistProductGroup = await productGroupService.checkProductGroupExist(group_id);
    if (!isExistProductGroup) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }

    await productService.updateProduct(id, product_code, size, unit_sell_price, group_id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update product successful'
    });
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    
    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    //#region Data validation
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await productService.checkProductExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product not found'
        });
    }

    await productService.deleteProduct(id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete product successful'
    });
}

module.exports = {
    getProductsByGroup,
    createProduct,
    updateProduct,
    deleteProduct
};