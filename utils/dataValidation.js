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

module.exports = {
    isVariableBlankOrNull,
    isArrayHasBlankOrNullElement
};