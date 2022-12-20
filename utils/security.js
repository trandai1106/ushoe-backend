require("dotenv").config();
const bcrypt = require('bcrypt');
const CONFIG_STATUS = require('../config/status.json');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY_AT, JWT_SECRET_KEY_RT, TOKEN_EXPIRE_AT, TOKEN_EXPIRE_RT } = process.env;

const SALT_ROUND = 10;

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
};

const generateAccessToken = ({ phone, role, _id, status }) => {
    const token = jwt.sign(
        { phone, role, _id, status },
        JWT_SECRET_KEY_AT,
        { expiresIn: TOKEN_EXPIRE_AT }
    );
    return token;
};
const generateRefreshToken = ({ phone, role, _id, status }) => {
    const token = jwt.sign(
        { phone, role, _id, status },
        JWT_SECRET_KEY_RT,
        { expiresIn: TOKEN_EXPIRE_RT }
    );
    return token;
};

const verifyPassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        return { status: 200, data};
    } catch (error) {
        return {
            status: CONFIG_STATUS.TOKEN_EXPIRED,
            message: `Token Expired AT ${error.expiredAt}`
        };
    }
};

module.exports = {
    encryptPassword,
    generateAccessToken,
    generateRefreshToken,
    verifyPassword,
    verifyToken
};