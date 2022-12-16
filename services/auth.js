const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createAccount = async (name, phone, rawPassword) => {
    console.log(name, phone, rawPassword);
    await User.create({ phone, name, encrypted_password: rawPassword });
};