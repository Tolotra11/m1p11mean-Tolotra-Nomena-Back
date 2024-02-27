
module.exports = app => {
    const router = require("express").Router();
    const tokenMiddleware = require('../middleware/token.middleware');
    const identifierMiddleware = require('../middleware/identifier.middleware'); 
    const rdv = require('../controllers/rdv.controller');

    router.post('/rdv/emp',rdv.getListAvailableEmploye);
    router.post('/rdv/insert',rdv.setRdv);
    router.get('/rdv/list',rdv.getListRDV);
    router.delete('/rdv/delete',rdv.deleteRdv);
    router.get('/rdvs',rdv.getListRDV);
    
    app.use('/api/clients', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,identifierMiddleware.getInfoClient,router);
}