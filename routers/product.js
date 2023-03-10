const route = require('express').Router();
const productController = require('../controllers/product');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list/:group_id',
    tryCatch(productController.getProductsByGroup)
);
route.post('/create',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productController.createProduct)
);
route.put('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productController.updateProduct)
);
route.delete('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(productController.deleteProduct)
);

module.exports = route;