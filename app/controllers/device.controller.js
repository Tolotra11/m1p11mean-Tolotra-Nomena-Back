const { ERROR_STATUS_CODE } = require("../constant/Error.constant");
const db = require("../models");
const Device = db.device;
exports.create = async(req,res) => {
    const auth_token = req.token;
    if(!req.body.token_registration || !req.decoded.userId || !auth_token){
        res.status(ERROR_STATUS_CODE.BAD_REQUEST).send({ message: "Content can not be empty!" });
        return;
    }
    try{
        const device = await Device.register(req.decoded.userId,req.body.token_registration,auth_token);
        res.send(device);
    }
    catch(error){
        res.status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR).send({message:error.message})
    }
    
}

exports.delete = async(req,res) => {
    try{
        const auth_token = req.token;
        await Device.deleteOne({auth_token: auth_token});
        res.status(200).json({ message: 'Dépense supprimé avec succès' });
    }
    catch(error){
        console.error(error);
        res.status(500).send({message:error.message});
    }
    
}