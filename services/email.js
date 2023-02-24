require('dotenv').config();
const User = require('../models/user');
const security = require('../utils/security');
const dataValidation  = require('../utils/dataValidation');
const user = require('../models/user');
const nodemailer = require('nodemailer');

const sendEmailResetPassword = async (receiver, secretKey) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER_ACCOUNT,
            pass: process.env.EMAIL_SENDER_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_SENDER_ACCOUNT,
        to: receiver,
        subject: "About Reset Password",
        text: "Hello\n"
        + "Your secret key is: " + secretKey
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendEmailResetPassword
};