const authService = require('../services/auth');

const login = async (req, res) => {
    res.send("Login");
};
const signUp = async (req, res) => {
    const { name, phone, password } = req.body;
    console.log(req.body);
    // TODO: check
    await authService.createAccount(name, phone, password);
    res.send("signUp");
};
const refreshToken = async (req, res) => {
    res.send("refreshToken");
};
const changePassword = async (req, res) => {
    res.send("changePassword");
};

module.exports = {
    login,
    signUp,
    refreshToken,
    changePassword
}