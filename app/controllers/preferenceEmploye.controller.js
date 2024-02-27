const { ERROR_STATUS_CODE } = require('../constant/Error.constant');
var models=require('../models')
module.exports={
    GetListPreferenceEmp(request,response){
        const idClient=request.decoded.userId;
      
        models.preferenceEmploye.find({idClient:idClient}).exec()
        .then(res=>{
           
            response.status(201).json({'data':res})
        })
        .catch(err=>{
            response.status(ERROR_STATUS_CODE.BAD_REQUEST).json({err});
        })
    },

    SetPrefernceEmp:(request,response)=>{
        if(request.decoded.userId!==''&& request.body.idEmploye!==''){
            const pref= new models.preferenceEmploye({
                idClient: request.decoded.userId,
                idEmploye: request.body.idEmploye,    
            });
            pref.save()
            .then(pref=>{
                response.status(201).json({"message":"success"});
            })
            .catch(error=>{
                response.status(400).json({"message":error});
            })
        }else{
            response.status(400).json({"message":'missing idClient or idEmploye'});
        }     
    },
    RemovePreferenceEmp:(request,response)=>{
        console.log(request.query)
        if(request.decoded.userId!==''&& request.query.idEmploye!==''){
           models.preferenceEmploye.deleteOne({
                idClient:request.decoded.userId,
                idEmploye:request.query.idEmploye
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
   
}