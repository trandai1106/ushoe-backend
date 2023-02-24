const authService = require('../services/auth');
const emailService = require('../services/email');
const provinceService = require('../services/province');
const districtService = require('../services/district');
const dataValidation = require('../utils/dataValidation');
const security = require('../utils/security');
const rand = require("random-key");
const CONFIG_STATUS = require('../config/status.json');

const login = async (req, res) => {
    const { phone, password } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([phone, password]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
    }
    
    const checkPhoneNumberFormat = await dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
    }    
    //#endregion

    // Check if the account is exist
    const isExist = await authService.checkExistPhone(phone);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is not exist'
        });
    }
    
    const user = await authService.getAccountInformation(phone);
    if (user.status == 0) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is blocked. Please contact with admin'
        });
    }
    

    // Verify password
    const verifyPassword = await authService.verifyPassword(phone, password);
    if (!verifyPassword) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Incorrect password'
        });
    }

    //#region Login successful
    const accessToken = await authService.generateAccessToken(phone);
    const refreshToken = await authService.generateRefreshToken(phone);
    //#endregion

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Login successful',
        data: {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    });
};
const signUpCustomer = async (req, res) => {
    const { name, phone, password, email } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, phone, password, email]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
    }
    const checkPhoneNumberFormat = await dataValidation.isPhoneNumber(phone);
    if (!checkPhoneNumberFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid phone number format'
        });
    }
    const checkEmailFormat = await dataValidation.isEmail(email);
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
    
    //#endregion

    // Check if the account is exist
    const isExistPhone = await authService.checkExistPhone(phone);
    const isExistEmail = await authService.checkExistPhone(email);
    if (isExistPhone || isExistEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Account is already exist'
        });
    }

    await authService.createAccount(name, phone, email, password, "CUSTOMER");
    res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Sign up successful'
    });
};
const refreshToken = async (req, res) => {
    //#region Data validation
    const refreshToken = req.body.refresh_token;
    if (dataValidation.isVariableBlankOrNull(refreshToken)) {
        return res.send({
            status: CONFIG_STATUS.TOKEN_ERROR,
            message: 'Invalid refresh token'
        });
    }
    //#endregion

    const decodedToken = security.verifyRefreshToken(refreshToken);
    if (decodedToken.status == 403) {
        return res.send({
            status: CONFIG_STATUS.TOKEN_ERROR,
            message: 'Invalid refresh token'
        });
    }
    else if (decodedToken.status == 200) {
        const userExist = await authService.checkExistPhone(decodedToken.data.phone);
        if (userExist) {
            const user = await authService.getAccountInformation(decodedToken.data.phone);
            const newAccessToken = security.generateAccessToken(user);
            return res.send({
                status: CONFIG_STATUS.SUCCESS,
                message: 'Create new access token successful!',
                data: {
                    access_token: newAccessToken
                }
            });
        } else {
            res.status(402).send({
                status: CONFIG_STATUS.TOKEN_ERROR,
                message: 'Unauthorized!'
            });
        }
    }
};
const changePassword = async (req, res) => {
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    const phone = req.user.phone;

    // Verify password
    const verifyPassword = await authService.verifyPassword(phone, oldPassword);
    if (!verifyPassword) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Incorrect password'
        });
    }

    const checkPasswordFormat = await dataValidation.isPasswordFormat(newPassword);
    if (!checkPasswordFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid password format'
        });
    }

    await authService.changePassword(phone, newPassword);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Change password successful'
    });
};

const getProfile = async (req, res) => {
    const phone = req.user.phone;

    const user = await authService.getAccountInformation(phone);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get profile successful',
        date: {
            profile: {
                phone: phone,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
                status: user.status,
                province_id: user.province_id,
                district_id: user.district_id,
                address_detail: user.address_detail
            }
        }
    });
};

const updateProfile = async (req, res) => {
    const phone = req.user.phone;

    const { name, email, avatar_url, province_id, district_id, address_detail } = req.body;

    // Verify
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, avatar_url]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }
    
    const isEmail = dataValidation.isEmail(email);
    if (!isEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Email is not invalid'
        });
    }
    const isExistEmail = await authService.checkExistEmail(email);
    if (isExistEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Email is exist'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(district_id) 
                            && dataValidation.isMongooseObjectId(province_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExistProvince = await provinceService.checkExist(province_id);
    if (!isExistProvince) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Province not found'
        });
    }
    const isExistDistrict = await districtService.checkExistInProvinceById(district_id, province_id);
    if (!isExistDistrict) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'District not found'
        });
    }

    await authService.updateProfile(phone, name, email, avatar_url, province_id, district_id, address_detail);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update profile successful'
    });
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;

    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(email);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
    }

    const isEmail = dataValidation.isEmail(email);
    if (!isEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid email'
        });
    }

    const isExistEmail = await authService.checkExistEmail(email);
    if (!isExistEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Email not found'
        });
    }

    const key = rand.generate(6);

    await authService.setKetResetPassword(email, key);
    await emailService.sendEmailResetPassword(email, key);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Send code successful'
    });
};

const resetPassword = async (req, res) => {
    const { email, key, new_password } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([ email, key, new_password ]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Required data is missing'
        });
    }

    const isEmail = dataValidation.isEmail(email);
    if (!isEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid email'
        });
    }

    const isExistEmail = await authService.checkExistEmail(email);
    if (!isExistEmail) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Email not found'
        });
    }
    
    const checkPasswordFormat = await dataValidation.isPasswordFormat(new_password);
    if (!checkPasswordFormat) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid password format'
        });
    }
    
    const isRightKey = await authService.checkResetPasswordKey(email, key);
    if (!isRightKey) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Wrong key'
        });
    }

    const user = await authService.getAccountInformationByEmail(email);
    await authService.changePassword(user.phone, new_password);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Reset password successful'
    });
};
module.exports = {
    login,
    signUpCustomer,
    refreshToken,
    changePassword,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword
};