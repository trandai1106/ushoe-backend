const authService = require('../services/auth');
const dataValidation = require('../utils/dataValidation');

const login = async (req, res) => {
    const { phone, password } = req.body;

    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([phone, password]);
    if (isMissRequiredData) {
        res.send("missing required data");
        return;
    }
    
    const isExistPhone = await authService.checkExistAccount(phone);
    if (!isExistPhone) {
        res.send("phone is not exist");
        return;
    }

    const verifyPassword = await authService.verifyPassword(phone, password);
    if (!verifyPassword) {
        res.send("password is not right");
        return;
    }

    // TODO: gen access_token and refresh_token

    res.send("Login successful");
};
const signUp = async (req, res) => {
    const { name, phone, password } = req.body;
    
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password]);
    if (isMissRequiredData) {
        res.send("missing required data");
        return;
    }

    const isExistPhone = await authService.checkExistAccount(phone);
    if (isExistPhone) {
        res.send("phone has already exist");
        return;
    }

    await authService.createAccount(name, phone, password, "CUSTOMER");
    res.send("signUp successful");
};
const refreshToken = async (req, res) => {
    res.send("refreshToken");
};
const changePassword = async (req, res) => {
    res.send("changePassword");
};

module.exports = {
    login,
    signUp,
    refreshToken,
    changePassword
};