const branchService = require('../services/branch');
const provinceService = require('../services/province');
const districtService = require('../services/district');
const dataValidation = require('../utils/dataValidation');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');

const getAllBranches = async (req, res) => {
    // let branches = [];
    const branches = await branchService.getAllBranches();

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get all branches successful',
        data: {
            branches: branches
        }
    });
};

const getBranchDetail = async (req, res) => {
    const branchId = req.params.id;
    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(branchId);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    const isMongooseObjectId = dataValidation.isMongooseObjectId(branchId);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }
    //#endregion

    const isExist = await branchService.checkExist(branchId);
    if (!isExist) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Branch not found'
        });
    }
    
    const branch = await branchService.getBranchById(branchId);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Get branch detail successful',
        data: {
            branch: branch
        }
    });
};

const createBranch = async (req, res) => {
    const { name, province_id, district_id, address_detail } = req.body;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, province_id, district_id, address_detail]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
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
    //#endregion
    
    await branchService.createBranch(name, province_id, district_id, address_detail);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Create branch successful'
    });
};

const updateBranch = async (req, res) => {
    const { name, province_id, district_id, address_detail } = req.body;
    const branch_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isArrayHasBlankOrNullElement([name, province_id, district_id, address_detail, branch_id]);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(district_id) 
                            && dataValidation.isMongooseObjectId(province_id)
                            && dataValidation.isMongooseObjectId(branch_id);
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
    const isExistBranch = await branchService.checkExist(branch_id);
    if (!isExistBranch) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Branch not found'
        });
    }
    //#endregion
    
    await branchService.updateBranch(branch_id, name, province_id, district_id, address_detail);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Update branch successful'
    });
};

const deleteBranch = async (req, res) => {
    const branch_id = req.params.id;

    //#region Data validation
    const isMissRequiredData = dataValidation.isVariableBlankOrNull(branch_id);
    if (isMissRequiredData) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Missing required data'
        });
    }

    const isMongooseObjectId = dataValidation.isMongooseObjectId(branch_id);
    if (!isMongooseObjectId) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Invalid ID'
        });
    }

    const isExistBranch = await branchService.checkExist(branch_id);
    if (!isExistBranch) {
        return res.send({
            status: CONFIG_STATUS.FAIL,
            message: 'Branch not found'
        });
    }
    //#endregion
    
    await branchService.deleteBranchById(branch_id);

    return res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: 'Delete branch successful'
    });
};

module.exports = {
    getAllBranches,
    getBranchDetail,
    createBranch,
    updateBranch,
    deleteBranch
};