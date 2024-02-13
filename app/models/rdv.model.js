module.exports = (mongoose) => {
  const rdvSchema = mongoose.Schema(
    {
      idService: {
        type: String,
        required: true,
      },
      idEmploye: {
        type: String,
        required: true,
      },
      idClient: {
        type: String,
        required: true,
      },
      dateheuredebut: {
        type: Date,
        required: true,
      },
      dateheurefin: {
        type: Date,
        required: true,
      },
      status: {
        type: Number,
        required: true,
        enum: [-10, 10],
        default: 10,
      },
      etat: {
        type: Number,
        enum: [-10, 1, 10],
        default: 1,
      },
    },
    { timestamps: true }
  );

  rdvSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Rdv = mongoose.model("rdv", rdvSchema);
  return Rdv;
};