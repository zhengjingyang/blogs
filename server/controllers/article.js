const Joi = require("joi");
module.exports = {
  /**
   * 获取列表
   */
  getList(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
  },
  /**
   * 新增
   */
  add(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
  },
  /**
   * 编辑
   */
  edit() {},
  /**
   * 删除
   */
  delete() {},
};
