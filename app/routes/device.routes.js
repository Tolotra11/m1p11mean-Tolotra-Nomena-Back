module.exports = app =>{
    const device = require("../controllers/device.controller");
    var tokenMiddleware = require('../middleware/token.middleware');

    var router = require("express").Router();
    router.post("/",device.create);
    router.delete("/",device.delete);
    app.use('/api/devices', tokenMiddleware.checkTokenExistance,tokenMiddleware.decryptToken,router);
}