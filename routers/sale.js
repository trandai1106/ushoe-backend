const route = require('express').Router();
const saleController = require('../controllers/sale');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.post('/create',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.createSale)
);
route.get('/list',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.getAllSales)
);
route.get('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.getSaleByID)
);
route.put('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.updateSale)
);
route.delete('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.deleteSale)
);
route.put('/block/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.blockSale)
);
route.put('/active/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(saleController.activeSale)
);
module.exports = route;