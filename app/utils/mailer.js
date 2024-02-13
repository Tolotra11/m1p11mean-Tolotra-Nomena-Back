const nodemailer = require('nodemailer');
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASSWORD;

//transporteur SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});


module.exports = {
    transporter
}

