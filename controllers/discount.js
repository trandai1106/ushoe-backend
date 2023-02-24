const discountService = require('../services/discount');
const branchService = require('../services/branch');
const productService = require('../services/product');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllDiscount = async (req, res) => {
    const discountList  = await discountService.getAllDiscount();
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all discounts successful',
        data: {
            discounts: discountList
        }
    });
}
const getDiscountDetail = async (req, res) => {
    const discount_id  = req.params.id;
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(discount_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await discountService.checkExist(discount_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Discount not found'
        });
    }

    const  discount  = await discountService.getDiscountByID(discount_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get discount detail successful',
        data: {
            discount: discount
        }
    });
}
const createDiscount = async (req, res) => {
    let { branches_id, is_all_branches, start_time, end_time, product_id, 
        discount_percent, discount_amount, discount_price } = req.body;

    var isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ is_all_branches, start_time, end_time, product_id ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    isMissBranchesId = dataValidation.isArrayHasBlankOrNullElement(branches_id);
    if (isMissBranchesId && !is_all_branches) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    isMissBranchesId = dataValidation.isArrayAllBlankOrNullElement([discount_percent, discount_amount, discount_price]);
    if (isMissBranchesId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    var isMongooseObjectId = dataValidation.isMongooseObjectId(product_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    var isExist = await productService.checkProductExist(product_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    
    
    for (var i = 0; i < branches_id.length; i++) {
        isMongooseObjectId = dataValidation.isMongooseObjectId(branches_id[i]);
        if (!isMongooseObjectId) {
            return res.send({
                status: CONFIG_STATUS.FAIL,
                message: 'Invalid ID'
            });
        }
    }

    if (discount_percent < 0 || discount_percent > 100
        || discount_price < 0 || discount_amount < 0) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid discount'
        });
    }

    if (is_all_branches) branches_id = await branchService.getAllBranchesId();

    await discountService.createDiscount( branches_id, start_time, end_time, product_id, 
        discount_percent, discount_amount, discount_price );
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create discount successful'
    });
}
const updateDiscount = async (req, res) => {
    const { name, title, description, content } = req.body;
    const id = req.params.id;    

    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([id, name, title, description, content ]);
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

    const isExist = await discountService.checkExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Discount not found'
        });
    }

    await discountService.updateDiscount(id, name, title, description, content);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update discount successful'
    });
}
const deleteDiscount = async (req, res) => {
    const id = req.params.id;    

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await discountService.checkExist(id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Discount not found'
        });
    }

    await discountService.deleteDiscount(id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete discount successful'
    });
}
module.exports = {
    getAllDiscount,
    getDiscountDetail,
    createDiscount,
    updateDiscount,
    deleteDiscount
}