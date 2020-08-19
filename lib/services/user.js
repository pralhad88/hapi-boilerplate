const Schmervice = require('schmervice');
const JWT = require('jsonwebtoken');
const _ = require('underscore');
const { OAuth2Client } = require('google-auth-library');
const Boom = require('@hapi/boom');
const CONFIG = require('../config');

module.exports = class UserService extends Schmervice.Service {
  async loginWithGoogle(idToken, txn) {
    const { User } = this.server.models();
    const googleClient = new OAuth2Client(CONFIG.auth.googleClientID);
    const response = await googleClient.verifyIdToken({
      idToken,
      audience: CONFIG.auth.googleClientID,
    });

    const userObj = {
      email: response.payload.email,
      name: response.payload.name,
      profile_picture: response.payload.picture,
      google_user_id: response.payload.sub,
    };

    let user = await User.query(txn).findOne({ email: userObj.email });
    if (!user) {
      user = await User.query(txn).insert(userObj);
    }
    return user;
  }

  createToken = (user) => {
    const JWTtoken = JWT.sign({ id: user.id, email: user.email }, CONFIG.auth.jwt.secret, {
      algorithm: 'HS256',
      expiresIn: CONFIG.auth.jwt.expiresIn,
    });
    return JWTtoken;
  };
};
