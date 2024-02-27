
module.exports = app => {
    const router = require("express").Router();
    const tokenMiddleware = require('../middleware/token.middleware');
    const identifierMiddleware = require('../middleware/identifier.middleware'); 
    const rdv = require('../controllers/rdv.controller');
    const horaireController = require('../controllers/horaire.controller');
    const preferenceEmploye = require("../controllers/preferenceEmploye.controller");
    const preferenceService = require("../controllers/preferenceService.controller");
    

    router.post('/rdv/emp',rdv.getListAvailableEmploye);
    router.post('/rdv/insert',rdv.setRdv);
    router.get('/rdv/list',rdv.getListRDV);
    router.delete('/rdv/delete',rdv.deleteRdv);
    router.get('/rdvs',rdv.getListRDV);
    
    router.get('/horaire/list',horaireController.getListHoraire);
    
    router.get('/services/pref',preferenceService.GetListPreferenceService);
    router.post('/services/pref',preferenceService.SetPreferenceService);
    router.delete('/services/pref',preferenceService.RemovePreferenceService);

    router.post('/pref',preferenceEmploye.SetPrefernceEmp);
    router.delete('/pref',preferenceEmploye.RemovePreferenceEmp);
    router.get('/pref',preferenceEmploye.GetListPreferenceEmp);

    app.use('/api/clients', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,identifierMiddleware.getInfoClient,router);
}