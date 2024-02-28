const { ERROR_STATUS_CODE } = require("../constant/Error.constant");
const db = require("../models");
const Rdv = db.rdv;
const Service = require('../models/service.model');

const getTask = async(req,res) =>{
  const idEmploye = req.decoded.userId;
  const currentDate = new Date(); // Date d'aujourd'hui
  currentDate.setHours(0, 0, 0, 0);
  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);
  try {
    const rdvEnCours = await Rdv.getRdv({idEmploye: idEmploye,status:10,etat:1, dateheuredebut: { $gt: currentDate }});
    const rdvFini = await Rdv.getRdv({idEmploye: idEmploye,status:10,etat:10, dateheuredebut: { $gte: currentDate, $lte: endOfDay}});
    res.send({
      todo: rdvEnCours,
      done: rdvFini
    });
  } catch (error) {
      console.error(error);
      res.status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR).send({message:"Une erreur s'est produite lors de la récupération des rendez-vous avec les services :"+ error});
  }
}


const mesRdv = async(req,res) =>{
  const idEmploye = req.decoded.userId;
  const currentDate = new Date(); // Date d'aujourd'hui
  currentDate.setHours(0, 0, 0, 0);
  try {
    const rdvsWithServicesAndClient = await Rdv.getRdv({idEmploye: idEmploye,status:10,etat:1, dateheuredebut: { $gt: currentDate }});
    res.send(rdvsWithServicesAndClient);
  } catch (error) {
      console.error(error);
      res.status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR).send({message:"Une erreur s'est produite lors de la récupération des rendez-vous avec les services :"+ error});
  }
}


const afficherRdv = async (req,res) => {
  const idEmploye = req.decoded.userId;
  try {
    const rdvs = await Rdv.find({idEmploye: idEmploye});

    
    const serviceIds = rdvs.map(rdv => rdv.idService);
    const services = await Service.find({ _id: { $in: serviceIds } });

    const rdvsWithServices = rdvs.map(rdv => {
        const service = services.find(service => service.id == rdv.idService);
        return { ...rdv.toObject(), service };
    });
    console.log(rdvsWithServices);
    res.send(rdvsWithServices);
  } catch (error) {
      console.error(error);
      res.status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR).send({message:"Une erreur s'est produite lors de la récupération des rendez-vous avec les services :"+ error});
  }
}


const insererRdv = async (req, res) => {
  try {
    const idEmploye = req.decoded.userId;
    const {
      idService,
      idClient,
      dateheuredebut,
      dateheurefin,
      status
    } = req.body;

    // if (
    //   !idEmploye ||
    //   !dateheuredebut ||
    //   !dateheurefin ||
    //   status === undefined
    // ) {
    //   return res.status(ERROR_STATUS_CODE.BAD_REQUEST).json({
    //     message:
    //       "Les champs idEmploye, dateheuredebut, dateheurefin et status sont obligatoires.",
    //   });
    // }
     if (new Date(dateheuredebut) >= new Date(dateheurefin)) {
      return res.status(400).json({
        message: "La date de début doit être antérieure à la date de fin.",
      });
    }

    if (new Date(dateheuredebut) < new Date()) {
      return res.status(400).json({
        message: "La date de début ne peut pas être dans le passé.",
      });
    }
    const existingRdv = await Rdv.findOne({
      idService,
      idEmploye,
      $or: [
        {
          $and: [
            { dateheuredebut: { $gte: dateheuredebut } },
            { dateheuredebut: { $lt: dateheurefin } },
          ],
        },
        {
          $and: [
            { dateheurefin: { $gt: dateheuredebut } },
            { dateheurefin: { $lte: dateheurefin } },
          ],
        },
      ],
    });

    if (existingRdv) {
      return res.status(400).json({
        message:
          "Un rendez-vous existe déjà dans l'intervalle de dates spécifié",
      });
    }

    const nouveauRdv = new Rdv({
      idService,
      idEmploye,
      idClient,
      dateheuredebut,
      dateheurefin,
      status: -10, // Par défaut, le statut est défini à 10 (rdv)
    });

    const rdvInsere = await nouveauRdv.save();

    return res.status(201).json(rdvInsere);
  } catch (error) {
    console.error("Erreur lors de l'insertion du rendez-vous :", error);
    return res
      .status(ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Erreur lors de l'insertion du rendez-vous ", error });
  }
};

const modifierRdv = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.query;

    const rdv = await Rdv.findById(id);
    if (!rdv) {
      return res
        .status(ERROR_STATUS_CODE.NOT_FOUND)
        .json({ message: "Rendez-vous non trouvé pour l'ID fourni" });
    }

    if (rdv.etat !== 1) {
      return res.status(ERROR_STATUS_CODE.BAD_REQUEST).json({
        message:
          "Impossible de modifier le rendez-vous car l'état est différent de 1",
      });
    }

    const result = await Rdv.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    if (result.nModified === 0) {
      return res
        .status(ERROR_STATUS_CODE.BAD_REQUEST)
        .json({ message: "Aucun rendez-vous n'a été modifié" });
    }

    return res.json({ message: "Rendez-vous modifié avec succès" });
  } catch (error) {
    console.error("Erreur lors de la modification du rendez-vous :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la modification du rendez-vous" });
  }
};

module.exports = {
  getTask,
  mesRdv,
  afficherRdv,
  insererRdv,
  modifierRdv,
};