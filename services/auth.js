const User = require('../models/user');
const security = require('../utils/security');

const createAccount = async (name, phone, email, rawPassword, role) => {
    const encryptedPassword = await security.encryptPassword(rawPassword);

    await User.create({ phone, name, email, encrypted_password: encryptedPassword, role });
};

const checkExistAccount = async (phone, email) => {
    const isExist = await User.exists({ phone, email });
    return isExist;
};

const verifyPassword = async (phone, rawPassword) => {
    const user = await User.findOne({ phone });
    const checkPassword = await security.verifyPassword(rawPassword, user.encrypted_password);
    return checkPassword;
};

const generateAccessToken = async (phone) => {
    const user = await User.findOne({ phone });
    
    const accessToken = security.generateAccessToken(user);

    return accessToken;
};
const generateRefreshToken = async (phone) => {
    const user = await User.findOne({ phone });
    
    const refreshToken = security.generateRefreshToken(user);
    
    return refreshToken;
};

const getAccountInformation = async (phone) => {
    const user = await User.findOne({ phone });
    return user;
};

module.exports = {
    createAccount,
    checkExistAccount,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    getAccountInformation
};