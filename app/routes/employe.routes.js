module.exports = app => {
    const router = require("express").Router();
    const employeeController = require('../controllers/employe.controller'); 
    const tokenMiddleware = require('../middleware/token.middleware');
    const identifierMiddleware = require('../middleware/identifier.middleware'); 

    router.get("/employee", 
        employeeController.afficherRdv
      );
      
      router.post("/inserer_rdv", 
        employeeController.insererRdv
      );
      
      router.get("/valider_un_rdv", 
        employeeController.modifierRdv
      );

      router.get('/rdvs',employeeController.mesRdv);

      router.get('/tasks',employeeController.getTask);
    app.use('/api/employes', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,identifierMiddleware.getInfoEmploye,router);
}