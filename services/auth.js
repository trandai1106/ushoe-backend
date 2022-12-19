const User = require('../models/user');
const security = require('../utils/security');

const createAccount = async (name, phone, rawPassword, role) => {
    const encryptedPassword = await security.encryptPassword(rawPassword);

    await User.create({ phone, name, encrypted_password: encryptedPassword, role });
};

const checkExistAccount = async (phone) => {
    const isExist = await User.exists({ phone });
    return isExist;
};

const verifyPassword = async (phone, password) => {
    const user = await User.findOne({ phone });
    const checkPassword = await security.verifyPassword(password, user.encrypted_password);
    return checkPassword;
};

module.exports = {
    createAccount,
    checkExistAccount,
    verifyPassword
};