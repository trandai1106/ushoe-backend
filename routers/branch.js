const route = require('express').Router();
const branchController = require('../controllers/branch');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(branchController.getAllBranches)
);
route.post('/create',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(branchController.createBranch)
);
route.get('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(branchController.getBranchDetail)
);
route.put('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(branchController.updateBranch)
);
route.delete('/detail/:id',
    requireLogin, 
    requireRole(["ADMIN"]),
    tryCatch(branchController.deleteBranch)
);

module.exports = route;