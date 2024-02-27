const { ERROR_STATUS_CODE } = require('../constant/Error.constant');
var models=require('../models')
module.exports={
    SetPreferenceService:(request,response)=>{
        if(request.decoded.userId !==''&& request.body.idService!==''){
            const pref= new models.preferenceServices({
                idClient: request.decoded.userId,
                idService: request.body.idService,    
            });
            pref.save()
            .then(pref=>{
                response.status(201).json({"message":"success"});
            })
            .catch(error=>{
                response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({"message":error});
            })
        }else{
            response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({"message":'missing idClient or idEmploye'});
        }     
    },
    RemovePreferenceService:(request,response)=>{
        if(request.decoded.userId !==''&& request.query.idService!==''){
           models.preferenceServices.deleteOne({
                idClient:request.decoded.userId,
                idService:request.query.idService
            })
            .then(resp=>{
                response.status(201).json({"message":"success "+resp})
            })
            .catch(err=>{
                response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({"message":error});
            })
            ;
            
        }
        else {
            response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({"message":'missing idClient or idEmploye'});
        }
    },
    GetListPreferenceService(request,response){
        const idClient=request.decoded.userId;
      
        models.preferenceServices.find({idClient:idClient}).exec()
        .then(res=>{
           
            response.status(201).json({'data':res})
        })
        .catch(err=>{
            response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({err});
        })
    }
}