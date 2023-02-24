const saleService = require('../services/sale');
const authService = require('../services/auth');
const branchService = require('../services/branch');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllSales = async (req, res) => {
    const sales  = await saleService.getAllSale();
    
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all sales successful',
        data: {
            sales: sales
        }
    });
};
const getSaleByID = async (req, res) => {
    const sale_id = req.params.id;

    const isMongooseObjectId = dataValidation.isMongooseObjectId(sale_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await saleService.checkExist(sale_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Sale not found'
        });
    }
    
    const  sale  = await saleService.getSaleByID(sale_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get sale detail successful',
        data: {
            sale: sale
        }
    });
};
const createSale = async (req, res) => {
    const { name, phone, password, email, branch_id } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email, branch_id]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(branch_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await branchService.checkExist(branch_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Branch not found'
        });
    }
    
    const checkPhoneNumberFormat = dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
    }
    const checkEmailFormat = dataValidation.isEmail(email);
    if (!checkEmailFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid email format'
        });
    }

    const checkPasswordFormat = await dataValidation.isPasswordFormat(password);
    if (!checkPasswordFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid password format'
        });
    }
    
    // Check if the account is exist
    const isExistPhone = await authService.checkExistPhone(phone);
    const isExistEmail = await authService.checkExistEmail(email);
    if (isExistPhone || isExistEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is already exist'
        });
    }
    //
    
    await saleService.createSale(name, phone, password, email, branch_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create sale successful'
    });
};
const updateSale = async (req, res) => {
    const { name, phone, password, email, branch_id } = req.body;
    const sale_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email, branch_id, sale_id]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(branch_id)
                                && dataValidation.isMongooseObjectId(sale_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExistBranch = await branchService.checkExist(branch_id);
    if (!isExistBranch) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Branch not found'
        });
    }

    const isExistSale = await saleService.checkExist(sale_id);
    if (!isExistSale) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Sale not found'
        });
    }
    
    const checkPhoneNumberFormat = dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
    }
    const checkEmailFormat = dataValidation.isEmail(email);
    if (!checkEmailFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid email format'
        });
    }

    const checkPasswordFormat = await dataValidation.isPasswordFormat(password);
    if (!checkPasswordFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid password format'
        });
    }
    
    // // Check if the account is exist
    // const isExistPhone = await authService.checkExistPhone(phone);
    // const isExistEmail = await authService.checkExistEmail(email);
    // if (isExistPhone || isExistEmail) {
    //     return res.send({
    //         status: CONFIG_STATUS.FAIL,
    //         message: 'Phone or email is already exist'
    //     });
    // }
    // //
    
    await saleService.updateSale(sale_id, name, phone, password, email, branch_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update sale successful'
    });
};
const deleteSale = async (req, res) => {
    const sale_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(sale_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(sale_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExistSale = await saleService.checkExist(sale_id);
    if (!isExistSale) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Sale not found'
        });
    }
    await saleService.deleteSale(sale_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete sale successful'
    });
};

const blockSale = async (req, res) => {
    const sale_id = req.params.id;

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(sale_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(sale_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await saleService.checkExist(sale_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Sale not found'
        });
    }

    await saleService.blockSale(sale_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Block sale successful'
    });
};
const activeSale = async (req, res) => {
    const sale_id = req.params.id;

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(sale_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(sale_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await saleService.checkExist(sale_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Sale not found'
        });
    }

    await saleService.activeSale(sale_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Active sale successful'
    });
};
module.exports = {
    getAllSales,
    getSaleByID,
    createSale,
    updateSale,
    deleteSale,
    blockSale,
    activeSale
}