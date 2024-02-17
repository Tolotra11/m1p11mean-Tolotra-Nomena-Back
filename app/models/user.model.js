const bcryptjs = require('bcrypt')
module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
      mail: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      mdp: {
        type: String,
        required: true,
        minlength: 8,
      },
      role: {
        type: Number,
        required: true,
        min: 0,
      },
      etat: {
        type: Number,
        default: 1,
      },
    },
    { timestamps: true }
  );

  userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", userSchema);
  User.login  = async (email, password, role) => {
    try {
       const user = await User.findOne({mail:email, role : role});
       if(!user){
         throw new Error('Email non existante');
       }
       const passwordMatch = await bcryptjs.compare(password, user.mdp);
       if (passwordMatch) {
           return user;
       }
       else{
         throw new Error('Adresse email ou mot de passe incorrect');
       }
    }
    catch(error){
       throw error;
    }
 }
  return User;
};