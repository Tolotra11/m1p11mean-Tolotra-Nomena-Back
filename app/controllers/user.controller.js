const db = require("../models");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY_TOKEN;
const User = db.user;
const { ERROR_STATUS_CODE } = require("../constant/Error.constant");

exports.loginClient = async (request, response)=> {
    const {email, password} = request.body;
    try{
        const user = await User.login(email,password,10);
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            SECRET_KEY,
            {
                expiresIn:'24h',
            }
        );
        return response.send({
            user: user,
            token:token
        });
       
    }
    catch(error){
        response.status(500).send({
            message:
              error.message || "Some error occurred while creating the Tutorial."
        });
    }
}

exports.loginEmploye = async (request, response)=> {
    const {email, password} = request.body;
    try{
        const user = await User.login(email,password,20);
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            SECRET_KEY,
            {
                expiresIn:'24h',
            }
        );
        return response.send({
            user: user,
            token:token
        });
       
    }
    catch(error){
        response.status(500).send({
            message:
              error.message || "Some error occurred while creating the Tutorial."
        });
    }
}

exports.loginManager = async (request, response)=> {
    const {email, password} = request.body;
    try{
        const user = await User.login(email,password,30);
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            SECRET_KEY,
            {
                expiresIn:'24h',
            }
        );
        return response.send({
            user: user,
            token:token
        });
       
    }
    catch(error){
        response.status(500).send({
            message:
              error.message || "Some error occurred while creating the Tutorial."
        });
    }
}

exports.registerClient =async (request, response) =>{
    const {nom,prenom,mail,mdp,confirmMdp} = request.body;
    if(mdp !== confirmMdp){
        response.status(ERROR_STATUS_CODE.BAD_REQUEST).send({
            message : 'Veuillez reconfirmer votre mot de passe'
        });
        return;
    }
    try{
        const newClient = await User.register(nom,prenom,mail,mdp,10);
        response.send(newClient);
    }
    catch(error){
        response.status(ERROR_STATUS_CODE.BAD_REQUEST).send({
            message : error.message
        });
        return;
    }
}

