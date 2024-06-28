const winston = require('winston');

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    http: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'magenta',
    http: 'cyan',
    info: 'blue',
    debug: 'grey',
  },
};

winston.addColors(customLevelsOptions.colors);

const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: './erros.log', level: 'error' }),
  ],
});

module.exports = { devLogger, prodLogger };
