const { version } = require('../../package.json');
// const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Rojar API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: 'https://rojar-api.herokuapp.com/v1',
    },
  ],
};

module.exports = swaggerDef;
// url: `http://localhost:${config.port}/v1`,
