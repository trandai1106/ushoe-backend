const districtService = require('../services/district');
const provinceService = require('../services/province');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllDistrict = async (req, res) => {
    const  districtList  = await districtService.getAllDistrict();
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all districts successful',
        data: {
            districts: districtList
        }
    });
}
const getDistrictsByProvince = async (req, res) => {
    const { province_id } = req.params;

    const isMongooseObjectId = dataValidation.isMongooseObjectId(province_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await provinceService.checkExist(province_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Province not found'
        });
    }

    const  districtsInProvince  = await districtService.getDistrictByProvince(province_id);
    
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get districts in province successful',
        data: {
            districts: districtsInProvince
        }
    });
}
const getDistrictByID = async (req, res) => {
    const district_id  = req.params.id;
    
    const isMongooseObjectId = dataValidation.isMongooseObjectId(district_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExist = await districtService.checkExist(district_id);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'District not found'
        });
    }

    const  district  = await districtService.getDistrictByID(district_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get district detail successful',
        data: {
            district: district
        }
    });
}
module.exports = {
    getAllDistrict,
    getDistrictsByProvince,
    getDistrictByID
}