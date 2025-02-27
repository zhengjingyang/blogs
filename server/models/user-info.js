const dbUtils = require("../utils/db-utils");

const user = {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create(model) {
    let result = await dbUtils.insertData("sys_user", model);
    return result;
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options) {    
    let _sql = `
    SELECT * from sys_user
      where username="${options.username}"
      limit 1`;
    let result = await dbUtils.query(_sql);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    
    return result;
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword(options) {    
    let _sql = `
    SELECT * from sys_user
      where password="${options.password}" and username="${options.username}" and del_flag != 1
      limit 1`;
    let result = await dbUtils.query(_sql);
    
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName(userName) {
    let result = await dbUtils.select("sys_user", [
      "id",
      "email",
      "username",
      "sex",
      "remark",
      "created_time",
      "updated_time",
    ]);
    if (Array.isArray(result) && result.length > 0) {
      result = result[0];
    } else {
      result = null;
    }
    return result;
  },
};

module.exports = user;
