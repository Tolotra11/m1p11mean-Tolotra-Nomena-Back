const { ERROR_STATUS_CODE } = require('../constant/Error.constant');
var models=require('../models')
module.exports={
    getListHoraire:(request,response)=>{
        models.horaire.find().exec()
        .then(res=>{
            response.status(201).send(res);
        })
        .catch(error=>{
            response.status(ERROR_STATUS_CODE.BAD_REQUEST).send(error);
        })
    }
}