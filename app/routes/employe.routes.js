module.exports = app => {
    const router = require("express").Router();
    const employeeController = require('../controllers/employe.controller'); 
    const tokenMiddleware = require('../middleware/token.middleware');
    const identifierMiddleware = require('../middleware/identifier.middleware'); 
    const userController = require('../controllers/user.controller');
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

      router.get('/tasks/done', employeeController.validerRdv);

      router.get('/unaivalability', employeeController.getIndisponibilite);

      router.delete('/rdv/:id',employeeController.deleteRdv);
      
      router.get('/profil',employeeController.currentProfil);

      router.put('/users/:id',userController.updateUser);
    app.use('/api/employes', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,identifierMiddleware.getInfoEmploye,router);
}