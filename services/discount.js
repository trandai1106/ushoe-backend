const Discount = require('../models/discount');

const getAllDiscount = async () => {
    let discount_list = await Discount.find();
    return discount_list;
};
const getDiscountByID = async (discount_id) => {
    let discount = await Discount.findById(discount_id);
    return discount;
};
const checkExist = async (discount_id) => {
    const isExist = await Discount.exists({ _id: discount_id })
    return isExist;
};
const createDiscount = async (branches_id, start_time, end_time, product_id, 
    discount_percent, discount_amount, discount_price) => {
    const startTime = new Date(start_time);
    const endTime = new Date(end_time);
    await Discount.create({  branches_id, startTime, endTime, product_id, 
        discount_percent, discount_amount, discount_price  });
};
const updateDiscount = async (id, name, title, description, content) => {
    await Discount.findByIdAndUpdate(id, { name, title, description, content });
};
const deleteDiscount = async (id) => {
    await Discount.findByIdAndDelete(id);
};

module.exports = {
    getAllDiscount,
    getDiscountByID,
    checkExist,
    createDiscount,
    updateDiscount,
    deleteDiscount
};