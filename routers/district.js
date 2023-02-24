const route = require('express').Router();
const districtController = require('../controllers/district');
const { tryCatch } = require('../middleware/errorHandler');

route.get('/list',
    tryCatch(districtController.getAllDistrict)
);
route.get('/detail/:id',
    tryCatch(districtController.getDistrictByID)
);
route.get('/in-province/:province_id',
    tryCatch(districtController.getDistrictsByProvince)
);

module.exports = route;