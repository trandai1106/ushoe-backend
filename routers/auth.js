const route = require('express').Router();
const authController = require('../controllers/auth');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.post('/login',
    tryCatch(authController.login)
);
route.post('/sign-up',
    tryCatch(authController.signUp)
);
route.post('/refresh-token',
    requireLogin,
    tryCatch(authController.refreshToken)
);
route.post('/change-password',
    requireLogin,
    tryCatch(authController.changePassword)
);

module.exports = route;