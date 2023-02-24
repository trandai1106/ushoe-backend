const Province = require("../models/province")
const { REGEX } = require('../config/regex')
const getAllProvince = async () => {
    let province_list = await Province.find();
    return province_list;
};
const getProvinceByID = async (province_id) => {
    let province = await Province.findById(province_id);
    return province;
};
const checkExist = async (province_id) => {
    const isExist = await Province.exists({ _id: province_id })
    return isExist;
};

module.exports = {
    getAllProvince,
    getProvinceByID,
    checkExist
};