const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación API Proyecto Coder',
      description: 'Documentación API Proyecto Coder',
    },
  },
  apis: [`./docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

module.exports = specs;
