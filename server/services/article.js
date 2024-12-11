/**
 * 文章业务操作
 */
const articleModel = require('../models/article')

module.exports = {
  /**
   * 创建文章
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async add(data) {
    let result = await articleModel.add(data);
    return result;
  },
};
