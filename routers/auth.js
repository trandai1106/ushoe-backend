const route = require('express').Router();
const authController = require('../controllers/auth');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.post('/login',
    tryCatch(authController.login)
);
route.post('/sign-up',
    tryCatch(authController.signUpCustomer)
);
route.post('/refresh-token',
    tryCatch(authController.refreshToken)
);
route.post('/change-password',
    requireLogin,
    tryCatch(authController.changePassword)
);
route.get('/profile',
    requireLogin,
    tryCatch(authController.getProfile)
);
route.put('/profile',
    requireLogin,
    tryCatch(authController.updateProfile)
);
route.post('/forgot-password',
    tryCatch(authController.forgotPassword)
);
route.post('/reset-password',
    tryCatch(authController.resetPassword)
);


module.exports = route;