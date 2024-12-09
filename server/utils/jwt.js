const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const toJwt = promisify(jwt.sign);
const toVerify = promisify(jwt.verify);

module.exports.createToken = async userInfo => {
  return await toJwt({ userInfo }, 'koa-video', { expiresIn: '24h' });
}

module.exports.verifyToken = async token => {
  return await toVerify(token, 'koa-video');
}
