const db = require('../models');
const Rdv = db.rdv;
const User = db.user;
const mail = require('../utils/mailer');
const moment = require('moment');
const sender = process.env.MAIL_USER;
const sendReminder = async() => {
    console.log(sender);
    try{
        const now = new Date();
        now.setHours(0,0,0,0);
        const rdvs = await Rdv.find({role:10,etat:1}).where('dateheuredebut').gte(now).lt(new Date(now.valueOf() + 24 * 60 * 60 * 1000));
        for(let i = 0; i< rdvs.length ; i++){
            const clientId = rdvs[i].idClient;
            console.log(clientId);
            const client = await User.findById(clientId);
            console.log(client);
            const date_format = moment(rdvs[i].dateheuredebut).locale('fr').format('dddd D MMMM YYYY [à] HH:mm');;
            const contentHtml = `
                <p>Bonjour ${client.prenom}</p>
                <p>
                    Ceci est un rappel de votre rendez-vous chez le salon de coiffure aujourd'hui le ${date_format}
                </p>
                <p>Cordialement,</p>
            `;
            if(client){
                mail.emailSender(sender,client.mail,'Rappel de rendez vous',contentHtml);
            } 
        }
    }
    catch(error){
        console.error(error);
    }   
}

module.exports = {
    sendReminder
}