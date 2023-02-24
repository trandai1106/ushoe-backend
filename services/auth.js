const User = require('../models/user');
const security = require('../utils/security');
const dataValidation  = require('../utils/dataValidation');
const user = require('../models/user');

const createAccount = async (name, phone, email, rawPassword, role) => {
    const encryptedPassword = await security.encryptPassword(rawPassword);

    await User.create({ phone, name, email, encrypted_password: encryptedPassword, role, avatar_url: '/public/avatar/default_avatar.png' });
};

const checkExistPhone = async (phone) => {
    const isExist = await User.exists({ phone });
    return isExist;
};
const checkExistEmail = async (email) => {
    const isExist = await User.exists({ email });
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

const getAccountInformationByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const changePassword = async (phone, newPassword) => {
    const encryptedPassword = await security.encryptPassword(newPassword);

    await User.findOneAndUpdate({ phone }, { encrypted_password: encryptedPassword });
};

const updateProfile = async (phone, name, email, avatar_url, province_id, district_id, address_detail) => {

    await User.findOneAndUpdate({ phone }, { name, email, avatar_url, province_id, district_id, address_detail });

};

const setKetResetPassword = async (email, key) => {

    await User.findOneAndUpdate({ email }, { secret_key_reset_password: key });

};

const checkResetPasswordKey = async (email, key) => {
    const isRightKey = await User.exists({ email, secret_key_reset_password: key });
    return isRightKey;
};

module.exports = {
    createAccount,
    checkExistPhone,
    checkExistEmail,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken,
    getAccountInformation,
    changePassword,
    updateProfile,
    checkResetPasswordKey,
    setKetResetPassword,
    getAccountInformationByEmail
};