const userInfoService = require("../services/user-info");
const userCode = require("../codes/user");
const Joi = require("joi");

module.exports = {
  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body;
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
    }).validate(formData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    let result = {
      success: false,
      message: "",
      data: null,
      code: "",
    };

    let userResult = await userInfoService.signIn(formData);

    if (userResult) {
      if (formData.userName === userResult.name) {
        result.success = true;
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
        result.code = "FAIL_USER_NAME_OR_PASSWORD_ERROR";
      }
    } else {
      (result.code = "FAIL_USER_NO_EXIST"),
        (result.message = userCode.FAIL_USER_NO_EXIST);
    }

    ctx.body = result;
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp(ctx) {
    let formData = ctx.request.body;
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
    }).validate(formData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }

    let result = {
      success: false,
      message: "",
      data: null,
    };

    let validateResult = await userInfoService.validatorSignUp(formData)
    if (!validateResult.success) {
      result = validateResult;
      ctx.body = result;
      return;
    }

    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      username: formData.username,
      created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (userResult && userResult.insertId * 1 > 0) {
      result.success = true;
      result.message = userCode.SUCCESS_REGISTERED;
    } else {
      result.message = userCode.ERROR_SYS;
    }

    ctx.body = result;
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo(ctx) {
    let session = ctx.session;
    let isLogin = session.isLogin;
    let userName = session.userName;

    console.log("session=", session);

    let result = {
      success: false,
      message: "",
      data: null,
    };
    if (isLogin === true && userName) {
      let userInfo = await userInfoService.getUserInfoByUserName(userName);
      if (userInfo) {
        result.data = userInfo;
        result.success = true;
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN;
      }
    } else {
      // TODO
    }

    ctx.body = result;
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin(ctx) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: "FAIL_USER_NO_LOGIN",
    };
    let session = ctx.session;
    if (session && session.isLogin === true) {
      result.success = true;
      result.message = "";
      result.code = "";
    }
    return result;
  },
};
