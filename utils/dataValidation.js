const { REGEX } = require('../config/regex');

const isVariableBlankOrNull = (data) => {
    if (data == undefined || data == null || data == '') {
        return true;
    }
    else {
        return false;
    }
};

const isArrayHasBlankOrNullElement = (array) => {
    for (var i = 0; i < array.length; i++) {
        if (isVariableBlankOrNull(array[i])) {
            return true;
        }
    }
    return false;   
};

const isPhoneNumber = (number) => {
    return REGEX.PHONE_REGEX.test(number);
}
const isPasswordFormat = (string) => {
    return REGEX.PASSWORD.test(string);
}
const isEmail = (string) => {
    return REGEX.EMAIL_REGEX.test(string);
}

module.exports = {
    isVariableBlankOrNull,
    isArrayHasBlankOrNullElement,
    isPhoneNumber,
    isPasswordFormat,
    isEmail
};