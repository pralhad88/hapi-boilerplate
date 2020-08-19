const Dotenv = require('dotenv');
const CONSTANTS = require('./constants');

Dotenv.config({ path: `${__dirname}/../server/.env` });

module.exports = {
  ...CONSTANTS,
  auth: {
    googleClientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: '7d',
    },
  },
  swagger: {
    uiPath: process.env.NODE_ENV === 'production' ? '/apiDocs/swaggerui/' : '/swaggerui/',
    jsonPath: process.env.NODE_ENV === 'production' ? '/apiDocs/swagger.json' : '/swagger.json',
    basePath: process.env.NODE_ENV === 'production' ? '/apiDocs/' : '/',
  },
  mode: process.env.NODE_ENV,
};
