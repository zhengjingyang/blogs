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
  /**
   * 编辑文章
   * @param {Object} data - 包含文章更新信息的数据对象
   * @param {string} id - 要编辑的文章的唯一标识符
   * @returns {Object} - 更新操作的结果
   */
  async edit(data, id) {
    let result = await articleModel.edit(data, id);
    return result;
  },
  /**
   * 获取文章列表
   * @param {Object} data - 包含分页和过滤条件的数据对象
   * @param {number} data.pageNum - 页码，默认为 1
   * @param {number} data.pageSize - 每页显示的文章数量，默认为 10
   * @param {string} data.type - 文章类型，可选
   * @returns {Object} - 包含文章列表、页码、页大小和总文章数的对象
   */
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
    let result = await articleModel.findDataByPage(params);
    // console.log(result, "result");

    return {
      list: result.list,
      pageNum,
      pageSize,
      totalCount: result.totalCount,
    };
  },
};
