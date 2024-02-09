module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        idClient: String,
        idEmploye: String,
        dateHeureDebut: Date,
        dateHeureFin: Date,
        prix: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Rdv = mongoose.model("rdv", schema);
    return Rdv;
  };