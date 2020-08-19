const Joi = require('@hapi/joi');
const { Model } = require('objection');
const ModelBase = require('./helpers/ModelBase');

module.exports = class User extends ModelBase {
  static get tableName() {
    return 'users';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      email: Joi.string().email().required(),
      password: Joi.string(),
      name: Joi.string().required(),
      profile_picture: Joi.string().uri().required(),
      google_user_id: Joi.string().required(),
      createdAt: Joi.date(),
    });
  }
  
  async $beforeInsert() {
    const now = new Date();
    this.createdAt = now;
  }
};
