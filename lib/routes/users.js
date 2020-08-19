const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const _ = require('underscore');
const User = require('../models/user');
const { getEditableRoles } = require('./helpers');

module.exports = [
  {
    method: 'POST',
    path: '/users/auth/google',
    options: {
      description: 'Generate JWT for sansaar using google idToken.',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          idToken: Joi.string().required(),
        }),
      },
      handler: async (request) => {
        const { userService } = request.services();
        const user = await userService.loginWithGoogle(request.payload.idToken);
        const token = await userService.createToken(user);

        return {
          user,
          token,
        };
      },
    },
  },
];
