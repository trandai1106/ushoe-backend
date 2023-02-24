const Branch = require('../models/branch');

const checkExist = async (id) => {
    const isExist = await Branch.exists({ _id: id });
    return isExist;
};

const getAllBranches = async () => {
    const branches = await Branch.find();
    return branches;
};
const getBranchById = async (id) => {
    const branch = await Branch.findById(id);
    return branch;
};
const getAllBranchesId = async () => {
    const branches = await Branch.find();
    let branchesId = [];
    for (var i = 0; i < branches.length; i++) {
        branchesId.push(branches[i]._id);
    }
    return branchesId;
};
const createBranch = async (name, province_id, district_id, address_detail) => {
    await Branch.create({
        name, province_id, district_id, address_detail
    });
};
const updateBranch = async (branch_id, name, province_id, district_id, address_detail) => {
    await Branch.updateOne({branch_id}, { name, province_id, district_id, address_detail });
};
const deleteBranchById = async (branch_id) => {
    await Branch.findByIdAndDelete(branch_id);
};
module.exports = {
    checkExist,
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranchById,
    getAllBranchesId
};