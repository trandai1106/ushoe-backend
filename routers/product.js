const route = require('express').Router();
const productController = require('../controllers/product');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list',
    tryCatch(productController.getProductGroupOnSaleList)
);
route.get('/detail/:id',
    tryCatch(productController.getProductGroupDetail)
);

module.exports = route;