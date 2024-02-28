
module.exports = (mongoose) => {
  const rdvSchema = mongoose.Schema(
    {
      idService: {
        type: String,
        required: false,
      },
      idEmploye: {
        type: String,
        required: true,
      },
      idClient: {
        type: String,
        required: false,
      },
      dateheuredebut: {
        type: Date
      },
      dateheurefin: {
        type: Date
      },
      status: {
        type: Number,
        required: true,
        //-10 indisponibilité 10 rdv
        enum: [-10, 10, 0],
        default: 10,
      },
      etat: {
        type: Number,
        //-10 annnulé  1 en cours 10 terminé
        enum: [-10, 1, 10],
        default: 1,
      },
      prix: {
        type: Number,
        require: true
      }
    },
    { timestamps: true }
  );

  rdvSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Rdv = mongoose.model("rdv", rdvSchema);
  Rdv.getRdv = async(condition)=>{
    const db = require('./index');
    const Service = require('../models/service.model');
    const Client = db.user;
    try {
      const rdvs = await Rdv.find(condition);    
      const serviceIds = rdvs.map(rdv => rdv.idService);
      const services = await Service.find({ _id: { $in: serviceIds } });
      const clientsIds = rdvs.map(rdv => rdv.idClient);
      const clients = await Client.find({_id:{$in: clientsIds}});
      const rdvsWithServicesAndClient = rdvs.map(rdv => {
          const service = services.find(service => service.id == rdv.idService);
          const client = clients.find(client=>client.id==rdv.idClient);
          return { ...rdv.toObject(), service, client };
      });
      return rdvsWithServicesAndClient;
    } catch (error) {
      throw error;
    }
  };
  return Rdv;
};