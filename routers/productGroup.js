const route = require('express').Router();
const productGroupController = require('../controllers/productGroup');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list',
    tryCatch(productGroupController.getProductGroupOnSaleList)
);
route.get('/detail/:id',
    tryCatch(productGroupController.getProductGroupDetail)
);
route.post('/create',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productGroupController.createProductGroup)
);

route.put('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productGroupController.updateProductGroup)
);
route.delete('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productGroupController.deleteProductGroup)
);

module.exports = route;