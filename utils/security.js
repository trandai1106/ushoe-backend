require("dotenv").config();
const bcrypt = require('bcrypt');
const CONFIG_STATUS = require('../config/status.json');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } = process.env;

const SALT_ROUND = 10;

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
};

const generateAccessToken = ({ phone, role, _id, status }) => {
    const token = jwt.sign(
        { phone, role, _id, status },
        JWT_SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_EXPIRE }
    );
    return token;
};
const generateRefreshToken = ({ phone, role, status }) => {
    const token = jwt.sign(
        { phone, role, _id, status },
        JWT_SECRET_KEY,
        { expiresIn: REFRESH_TOKEN_EXPIRE }
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