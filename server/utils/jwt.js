const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const toJwt = promisify(jwt.sign);
const toVerify = promisify(jwt.verify);

module.exports.createToken = async (userInfo) => {
  return await toJwt({ userInfo }, "koa-video", { expiresIn: "24h" });
};

module.exports.verifyToken = (required) => {
  return async function (ctx, next) {
    let token = ctx.headers["authorization"];
    if (!token) {
      if (required) {
        ctx.throw(401, "No token provided");
      } else {
        return await next();
      }
    }
    // 检查并移除 Bearer 前缀
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    try {
      ctx.state.user = jwt.verify(token, "koa-video");
      await next();
    } catch (err) {
      console.log(err, "error");

      ctx.throw(401, "Invalid token");
    }
  };
};
