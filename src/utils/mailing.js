const nodemailer = require('nodemailer');
const varConfig = require('../config/envVarConfig');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: varConfig.mailer_usr,
    pass: varConfig.mailer_pass,
  },
});

module.exports = { transporter };
