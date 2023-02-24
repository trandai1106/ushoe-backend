const User = require("../models/user");
const security = require('../utils/security');
const { REGEX } = require('../config/regex');

const getAllCustomer = async () => {
    let customer_list = await User.find({ role: "CUSTOMER" });
    return customer_list;
};
const getCustomerByID = async (customer_id) => {
    let customer = await User.findOne({ _id: customer_id, role: "CUSTOMER" });
    return customer;
};
const checkExist = async (customer_id) => {
    const isExist = await User.exists({ _id: customer_id, role: "CUSTOMER"  })
    return isExist;
};

const createCustomer = async (name, phone, password, email, branch_id) => {
    const encryptedPassword = await security.encryptPassword(password);

    await User.create({ name, phone, email, branch_id, role: "CUSTOMER", encrypted_password: encryptedPassword });
};

const updateCustomer = async (customer_id, name, phone, password, email, branch_id) => {
    const encryptedPassword = await security.encryptPassword(password);

    await User.findByIdAndUpdate(customer_id, { name, phone, email, branch_id, encrypted_password: encryptedPassword });
};

const deleteCustomer = async (customer_id) => {
    await User.findByIdAndDelete(customer_id);
};

const blockCustomer = async (customer_id) => {
    await User.findByIdAndUpdate(customer_id, { status : 0 });
};

const activeCustomer = async (customer_id) => {
    await User.findByIdAndUpdate(customer_id, { status : 1 });
};

module.exports = {
    getAllCustomer,
    getCustomerByID,
    checkExist,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    blockCustomer,
    activeCustomer
};