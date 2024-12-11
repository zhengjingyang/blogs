const Joi = require("joi");
const articleService = require("../services/article");
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
  async add(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
    const schema = Joi.object({
      title: Joi.string().required()
    }).validate(formData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    let result = {
      success: false,
      message: "",
      data: null,
      code: ""
    };
    let data = {
      ...formData
    };
    data.created_time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    data.updated_time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    data.created_by = userObj.username;
    data.updated_by = userObj.username;
    let articleResult = await articleService.add(data);
  },
  /**
   * 编辑
   */
  edit() {},
  /**
   * 删除
   */
  delete() {}
};
