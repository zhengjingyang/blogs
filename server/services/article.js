/**
 * 文章业务操作
 */
const articleModel = require("../models/article");

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
  async edit(data, id) {
    let result = await articleModel.edit(data, id);
    return result;
  },
  async getList(data) {
    let pageNum = data.pageNum || 1;
    let pageSize = data.pageSize || 10;
    let params = {
      start: pageSize * (pageNum - 1),
      end: pageSize * pageNum,
      conditions: {},
    };
    if (data.type) {
      params.conditions["type"] = data.type;
    }
    let result = await articleModel.findDataByPage(
      params.start,
      params.end,
      params.conditions
    );
    console.log(result, 'result');
    
    return {
      list: result.list,
      pageNum,
      pageSize,
      total: result.total,
    };
  },
};
