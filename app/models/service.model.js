const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    nom: {
      type: String,
      unique: true,
      required: true,
    },
    prix: {
      type: Number,
      min: 0,
    },
    delai: {
      type: String, 
      validate: {
        validator: function (value) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: 'Le délai doit être au format "HH:MM"',
      },
    },
    commission: Number,
    etat: {
        type: Number,
        default: 5
    }
  });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;