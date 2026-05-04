const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Project API',
    version: '1.0.0',
    description: 'REST API for managing projects with images',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local server',
    },
  ],

  tags: [
    { name: 'Users', description: 'User-related endpoints' },
    { name: 'Services', description: 'Service-related endpoints' },
    { name: 'Tokens', description: 'Token-related endpoints' } 
  ],

  components: {
    schemas: {
      Service: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 10 },
          name: { type: 'string', example: 'API Polarion' },
          description: { type: 'string', example: 'Web service exposed for Polarion.' }
        }
      },
      Token: {   
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          value: { type: 'string', example: 'RXhhbXBsZVRva2Vu' },
          creation_date: { type: 'string', format: 'date-time', example: '2025-09-02T10:30:00Z' },
          expiration_date: { type: 'string', format: 'date-time', example: '2026-09-02T10:30:00Z' },
          user_id: { type: 'integer', example: 1 },
          service_id: { type: 'integer', example: 1 }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};
 
const swaggerSpec = swaggerJSDoc(options);
 
function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
 
module.exports = setupSwagger;
