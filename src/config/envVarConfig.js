const dotenv = require('dotenv');
const enviroment = require('./config');

dotenv.config({
  path:
    enviroment === 'prod'
      ? '.env.production'
      : enviroment === 'test'
      ? '.env.test'
      : '.env.mock',
});
module.exports = {
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  string_con: process.env.STRING_CONNECTION,
  mailer_usr: process.env.NODE_MAILER_USR,
  mailer_pass: process.env.NODE_MAILER_PASS,
  enviroment: enviroment,
};
