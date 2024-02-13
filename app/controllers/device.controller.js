const db = require("../models");
const Device = db.device;

//registration device
exports.create = async(req,res) => {
    const auth_token = request.headers['Authorization'];
    if(!req.body.token_registration || !req.body.userId || !auth_token){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try{
        const device = await Device.register(req.body.userId,req.body.token_registration,req.body.auth_token);
        res.send(device);
    }
    catch(error){
        res.status(500).send({message:error.message})
    }
    
}