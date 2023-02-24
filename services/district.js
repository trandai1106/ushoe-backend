const District = require('../models/district');

const getAllDistrict = async () => {
    let district_list = await District.find();
    return district_list;
};
const getDistrictByProvince = async (province_id) => {
    let district_list = await District.find({
        province_id
    });
    return district_list;
};
const getDistrictByID = async (district_id) => {
    let district = await District.findById(district_id);
    return district;
};
const checkExistInProvinceById = async (district_id, province_id) => {
    const isExist = await District.exists({
        _id: district_id,
        province_id
    });
    return isExist;
};
const checkExist = async (district_id) => {
    const isExist = await District.exists({ _id: district_id })
    return isExist;
};

module.exports = {
    getAllDistrict,
    getDistrictByProvince,
    getDistrictByID,
    checkExistInProvinceById,
    checkExist
};