const { ERROR_STATUS_CODE } = require('../constant/Error.constant');
const db = require('../models');
const OffreSpecial = db.offreSpecial;
const Service = require('../models/service.model');

exports.create = async(req, res) => {
    if (!req.body.idService || !req.body.dateDebut || !req.body.dateFin || !req.body.reduction) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if(req.body.reduction && req.body.reduction < 0){
        res.status(400).send({ message: "Reduction doit être supérieur à 0" });
        return;
    }
    const offreSpecial = new OffreSpecial(
        {
            idService:req.body.idService,
            reduction:req.body.reduction,
            dateDebut:req.body.dateDebut,
            dateFin:req.body.dateFin
        }
    );  
    const service = await Service.findOne({_id:req.body.idService , etat: 5});
    if(!service){
        res.status(404).send({message: "Le service n'existe pas ou n'est plus actif"});
        return;
    }
    offreSpecial
        .save(offreSpecial)
        .then(data =>{
            const sendPushNotification = require("../firebase/firebaseUtils")("Offre speciale","Reduction de"+req.body.reduction+"% pour le service "+service.nom);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });
}

exports.findAll =async (req, res) => {
    try {
        const { idService, reduction, dateDebut, dateFin ,page,limit} = req.query;
        let query = {};
        
        // Filtrer par autres champs
        if (idService && idService.trim() !== "") query.idService = idService;
        if (reduction && reduction.trim() !== "") {
           query.reduction = reduction;
        }
        if (dateDebut && dateDebut.trim() !== ""){
            if (dateFin && dateFin.trim() !== ""){
                query.dateDebut = {$lte: new Date(dateDebut)}
                query.dateFin = {$gte : new Date(dateFin)};
            }
            else{
                query.dateDebut = {$eq: new Date(dateDebut)};
            }
        } 
        else{
            if(dateFin && dateFin.trim() !== ""){
                query.dateFin = {$eq : new Date(dateFin) };
            }
        }
       
        console.log(query);
        const pageOptions = {
          page: parseInt(page, 10) || 0,
          limit: parseInt(limit, 10) || 10,
        };
    
        const offre_specials = await OffreSpecial.find(query)
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit);
          const serviceIds = offre_specials.map(offre => offre.idService);
          const services = await Service.find({ _id: { $in: serviceIds } });
          const offreWithServicesAndClient = offre_specials.map(offre => {
              const service = services.find(service => service.id == offre.idService);
              return { ...offre.toObject(), service };
          });
        res.send(offreWithServicesAndClient);
      } catch (error) {
        console.error(error);
        res.status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: error.message });
      }
}
