const productService = require('../services/product');
const dataValidation = require('../utils/dataValidation');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');

const getProductGroupOnSaleList = async (req, res) => {
    let productGroupsInfo = [];
    const productGroupsOnSale = await productService.getProductGroupsOnSale();
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

    const isExist = await productService.checkProductGroupExist(productGroupId);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Product group not found'
        });
    }
    
    const productGroup = await productService.getProductGroupById(productGroupId);
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

module.exports = {
    getProductGroupOnSaleList,
    getProductGroupDetail
};