const route = require('express').Router();
const discountController = require('../controllers/discount');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list',
    tryCatch(discountController.getAllDiscount)
);
route.get('/detail/:id',
    tryCatch(discountController.getDiscountDetail)
);
route.post('/create',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(discountController.createDiscount)
);
route.put('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(discountController.updateDiscount)
);
route.delete('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(discountController.deleteDiscount)
);

module.exports = route;