const customerService = require('../services/customer');
const authService = require('../services/auth');
const branchService = require('../services/branch');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllCustomers = async (req, res) => {
    const customers  = await customerService.getAllCustomer();
    
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all customers successful',
        data: {
            customers: customers
        }
    });
};
const getCustomerByID = async (req, res) => {
    const customer_id = req.params.id;

    const isMongooseObjectId = dataValidation.isMongooseObjectId(customer_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await customerService.checkExist(customer_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Customer not found'
        });
    }
    
    const  customer  = await customerService.getCustomerByID(customer_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get customer detail successful',
        data: {
            customer: customer
        }
    });
};
const createCustomer = async (req, res) => {
    const { name, phone, password, email } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
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
    
    await customerService.createCustomer(name, phone, password, email);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create customer successful'
    });
};
const updateCustomer = async (req, res) => {
    const { name, phone, password, email } = req.body;
    const customer_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email, customer_id]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isExistCustomer = await customerService.checkExist(customer_id);
    if (!isExistCustomer) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Customer not found'
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
    
    await customerService.updateCustomer(customer_id, name, phone, password, email);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update customer successful'
    });
};
const deleteCustomer = async (req, res) => {
    const customer_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(customer_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(customer_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExistCustomer = await customerService.checkExist(customer_id);
    if (!isExistCustomer) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Customer not found'
        });
    }
    await customerService.deleteCustomer(customer_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete customer successful'
    });
};

const blockCustomer = async (req, res) => {
    const customer_id = req.params.id;

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(customer_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(customer_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await customerService.checkExist(customer_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Customer not found'
        });
    }

    await customerService.blockCustomer(customer_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Block customer successful'
    });
};
const activeCustomer = async (req, res) => {
    const customer_id = req.params.id;

    const isMissRequiredData = dataValidation.isVariableBlankOrNull(customer_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(customer_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await customerService.checkExist(customer_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Customer not found'
        });
    }

    await customerService.activeCustomer(customer_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Active customer successful'
    });
};
module.exports = {
    getAllCustomers,
    getCustomerByID,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    blockCustomer,
    activeCustomer
};