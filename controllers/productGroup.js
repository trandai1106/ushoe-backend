const productGroupService = require('../services/productGroup');
const productService = require('../services/product');
const dataValidation = require('../utils/dataValidation');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');

const getProductGroupOnSaleList = async (req, res) => {
    let productGroupsInfo = [];
    const productGroupsOnSale = await productGroupService.getProductGroupsOnSale();
    for (var i = 0; i < productGroupsOnSale.length; i++) {
    // productGroupsOnSale.forEach(async productGroup => {
        const products = await productService.getProductsInGroup(productGroupsOnSale[i]._id);
        productGroupsInfo.push({
            product_group_id: productGroupsOnSale[i]._id,
            name: productGroupsOnSale[i].name,
            status: productGroupsOnSale[i].status,
            products: products
        });
    }
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get product list successful',
        data: {
            product_groups: productGroupsInfo
        }
    });
};

const getProductGroupDetail = async (req, res) => {
    const productGroupId = req.params.id;
    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(productGroupId);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    const isMongooseObjectId = dataValidation.isMongooseObjectId(productGroupId);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await productGroupService.checkProductGroupExist(productGroupId);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }
    
    const productGroup = await productGroupService.getProductGroupById(productGroupId);
    const products = await productService.getProductsInGroup(productGroupId);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get product list successful',
        data: {
            product_group: {
                product_group_id: productGroup._id,
                name: productGroup.name,
                status: productGroup.status,
                products: products
            }
        }
    });
};

const createProductGroup = async (req, res) => {
    const { name, images_url, description } = req.body;
    
    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ name, images_url ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    await productGroupService.createProductGroup(name, images_url, description);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create product group successful'
    });
};

const updateProductGroup = async (req, res) => {
    const { name, images_url, description } = req.body;
    const id = req.params.id;
    
    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ name, images_url ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await productGroupService.checkProductGroupExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }

    await productGroupService.updateProductGroup(id, name, images_url, description);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update product group successful'
    });
};

const deleteProductGroup = async (req, res) => {
    const id = req.params.id;
    
    //#region Data validation
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await productGroupService.checkProductGroupExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }

    await productGroupService.deleteProductGroup(id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete product group successful'
    });
};


module.exports = {
    getProductGroupOnSaleList,
    getProductGroupDetail,
    createProductGroup,
    updateProductGroup,
    deleteProductGroup
};