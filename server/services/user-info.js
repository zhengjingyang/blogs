/**
 * 用户业务操作
 */
const userModel = require("./../models/user-info");
const userCode = require("./../codes/user");

const user = {
  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create(user) {
    let result = await userModel.create(user);
    return result;
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne(formData) {
    let resultData = await userModel.getExistOne({
      email: formData.email,
      name: formData.userName,
    });
    return resultData;
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn(formData) {
    let resultData = await userModel.getOneByUserNameAndPassword({
      password: formData.password,
      username: formData.username,
    });
    return resultData;
  },

  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {
    let resultData = (await userModel.getUserInfoByUserName(userName)) || {};
    let userInfo = {
      id: resultData.id,
      email: resultData.email,
      userName: resultData.username,
      sex: resultData.sex,
      remark: resultData.remark,
      createdTime: resultData.created_time,
      updatedTime: resultData.updated_time,
    };
    return userInfo;
  },

  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  async validatorSignUp(userInfo) {
    let result = {
      success: false,
      message: "",
    };

    if (userInfo.password !== userInfo.confirmPassword) {
      result.message = userCode.ERROR_PASSWORD_CONFORM;
      return result;
    }

    let resultData = (await userModel.getExistOne(userInfo)) || {};
    if (resultData && resultData.id) {
      result.success = false;
      result.message = userCode.FAIL_USER_NAME_IS_EXIST
    } else {
      result.success = true;
    }

    return result;
  },
};

module.exports = user;
