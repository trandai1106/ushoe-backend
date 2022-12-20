const authService = require('../services/auth');
const dataValidation = require('../utils/dataValidation');
const securityService = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');

const login = async (req, res) => {
    const { phone, password } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([phone, password]);
    if (isMissRequiredData) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
        return;
    }
    
    const checkPhoneNumberFormat = await dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
        return;
    }    
    const checkPasswordFormat = await dataValidation.isPasswordFormat(phone);
    if (!checkPasswordFormat) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid password format. Pass word must have min 8 character'
        });
        return;
    }    
    //#endregion

    // Check if the account is exist
    const isExist = await authService.checkExistAccount(phone);
    if (!isExist) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is not exist'
        });
        return;
    }

    // Verify password
    const verifyPassword = await authService.verifyPassword(phone, password);
    if (!verifyPassword) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Incorrect password'
        });
        return;
    }

    //#region Login successful
    const accessToken = await authService.generateAccessToken(phone);
    const refreshToken = await authService.generateRefreshToken(phone);
    const accountInformation = await authService.getAccountInformation(phone);
    //#endregion

    res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Login successful',
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
            account_information: {
                phone: accountInformation.phone,
                name: accountInformation.name,
                role: accountInformation.role,
                avatar_url: accountInformation.avatar_url
            }
        }
    });
};
const signUp = async (req, res) => {
    const { name, phone, password, email } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email]);
    if (isMissRequiredData) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
        return;
    }
    const checkPhoneNumberFormat = await dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
        return;
    }
    const checkEmailFormat = await dataValidation.isEmail(email);
    if (!checkEmailFormat) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid email format'
        });
        return;
    }
    
    //#endregion

    // Check if the account is exist
    const isExist = await authService.checkExistAccount(phone, email);
    if (isExist) {
        res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is already exist'
        });
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