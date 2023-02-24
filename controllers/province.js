const provinceService = require('../services/province');
const dataValidation = require('../utils/dataValidation');
const CONFIG_STATUS = require('../config/status.json');

const getAllProvinces = async (req, res) => {
    const provinces  = await provinceService.getAllProvince();
    
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all provinces successful',
        data: {
            provinces: provinces
        }
    });
}
const getProvinceByID = async (req, res) => {
    const province_id = req.params.id;

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
    
    const  province  = await provinceService.getProvinceByID(province_id);
    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get province detail successful',
        data: {
            province: province
        }
    });
}
module.exports = {
    getAllProvinces,
    getProvinceByID
}