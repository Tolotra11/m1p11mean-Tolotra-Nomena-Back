module.exports = app =>{
    const device = require("../controllers/device.controller");
    var router = require("express").Router();
    router.post("/device",device.create);
    app.use('/api',router);
}