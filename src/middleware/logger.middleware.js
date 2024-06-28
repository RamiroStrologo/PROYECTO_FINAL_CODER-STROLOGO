const envVars = require('../config/envVarConfig');
const { devLogger, prodLogger } = require('../config/logger');

const addLogger = (req, res, next) => {
  console.log(envVars.enviroment === 'prod');
  if (envVars.enviroment === 'prod') {
    req.logger = prodLogger;
    req.logger.http(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.debug(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.error(
      `${req.method} en ${
        req.url
      }  - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.info(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
  } else {
    req.logger = devLogger;
    req.logger.http(
      `${req.method} en ${req.url} ${
        req.body
      }- at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.debug(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
    req.logger.error(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
  }
  next();
};

module.exports = { addLogger };
