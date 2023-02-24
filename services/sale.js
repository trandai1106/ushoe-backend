const User = require("../models/user");
const security = require('../utils/security');
const { REGEX } = require('../config/regex');

const getAllSale = async () => {
    let sale_list = await User.find({ role: "SALE" });
    return sale_list;
};
const getSaleByID = async (sale_id) => {
    let sale = await User.findOne({ _id: sale_id, role: "SALE" });
    return sale;
};
const checkExist = async (sale_id) => {
    const isExist = await User.exists({ _id: sale_id, role: "SALE"  })
    return isExist;
};

const createSale = async (name, phone, password, email, branch_id) => {
    const encryptedPassword = await security.encryptPassword(password);

    await User.create({ name, phone, email, branch_id, role: "SALE", encrypted_password: encryptedPassword });
};

const updateSale = async (sale_id, name, phone, password, email, branch_id) => {
    const encryptedPassword = await security.encryptPassword(password);

    await User.findByIdAndUpdate(sale_id, { name, phone, email, branch_id, encrypted_password: encryptedPassword });
};

const deleteSale = async (sale_id) => {
    await User.findByIdAndDelete(sale_id);
};

const blockSale = async (sale_id) => {
    await User.findByIdAndUpdate(sale_id, { status : 0 });
};

const activeSale = async (sale_id) => {
    await User.findByIdAndUpdate(sale_id, { status : 1 });
};

module.exports = {
    getAllSale,
    getSaleByID,
    checkExist,
    createSale,
    updateSale,
    deleteSale,
    blockSale,
    activeSale
};