module.exports = app => {
    const router = require("express").Router();
    const userController = require('../controllers/user.controller');
    const tokenMiddleware = require('../middleware/token.middleware');
    const identifierMiddleware = require('../middleware/identifier.middleware'); 

    router.post('/users',userController.registerEmploye);
    router.get("/users",userController.getUsers);
    router.get("/users/:id",userController.getUserById);
    router.delete('/users/:id',userController.deleteUser);
    router.put('/users/:id',userController.updateUser);
    app.use('/api/managers', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,identifierMiddleware.getInfoManager,router);
}