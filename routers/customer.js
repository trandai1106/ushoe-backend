const route = require('express').Router();
const customerController = require('../controllers/customer');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.post('/create',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.createCustomer)
);
route.get('/list',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.getAllCustomers)
);
route.get('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.getCustomerByID)
);
route.put('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.updateCustomer)
);
route.delete('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.deleteCustomer)
);
route.put('/block/:id',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.blockCustomer)
);
route.put('/active/:id',
    requireLogin, 
    requireRole(["ADMIN", "SALE"]),
    tryCatch(customerController.activeCustomer)
);
module.exports = route;