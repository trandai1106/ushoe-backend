const route = require('express').Router();
const provinceController = require('../controllers/province');
const { tryCatch } = require('../middleware/errorHandler');

route.get('/list',
    tryCatch(provinceController.getAllProvinces)
);
route.get('/detail/:id',
    tryCatch(provinceController.getProvinceByID)
);
module.exports = route;