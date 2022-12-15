const route = require('express').Router();
const authCustomerController = require('../controller/authCustomer');
const { tryCatch } = require('../middlewares/errorHandler');
const { requireLogin, requireRole } = require('../middlewares/auth');

route.post('/login',
    tryCatch(authCustomerController.customerLogin)
);
route.post('/logout',
    requireLogin,
    requireRole(['CONSUMER']),
    tryCatch(authCustomerController.customerLogOut)
);

module.exports = route;