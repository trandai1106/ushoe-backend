const route = require('express').Router();
const eventController = require('../controllers/event');
const { tryCatch } = require('../middleware/errorHandler');
const { requireLogin, requireRole } = require('../middleware/auth');

route.get('/list',
    tryCatch(eventController.getAllEvent)
);
route.get('/detail/:id',
    tryCatch(eventController.getEventDetail)
);
route.post('/create',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(eventController.createEvent)
);
route.put('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(eventController.updateEvent)
);
route.delete('/detail/:id',
    requireLogin,
    requireRole(["ADMIN"]),
    tryCatch(eventController.deleteEvent)
);

module.exports = route;