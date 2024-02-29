module.exports = app => {
    const router = require("express").Router();
    const serviceController = require('../controllers/service.controller'); 
    var tokenMiddleware = require('../middleware/token.middleware');

    router.get('/listeservices', serviceController.getAllServices);
    router.get('/search',serviceController.searchService);

    app.use('/api/services', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,router);
}