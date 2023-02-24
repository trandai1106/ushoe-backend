const route = require('express').Router();
const saleController = require('../controllers/sale');
const { tryCatch } = require('../middleware/errorHandler');

route.post('/create',
    tryCatch(saleController.createSale)
);
route.get('/list',
    tryCatch(saleController.getAllSales)
);
route.get('/detail/:id',
    tryCatch(saleController.getSaleByID)
);
route.put('/detail/:id',
    tryCatch(saleController.updateSale)
);
route.delete('/detail/:id',
    tryCatch(saleController.deleteSale)
);
route.put('/block/:id',
    tryCatch(saleController.blockSale)
);
route.put('/active/:id',
    tryCatch(saleController.activeSale)
);
module.exports = route;