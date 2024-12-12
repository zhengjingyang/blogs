const Joi = require("joi");
const articleService = require("../services/article");
module.exports = {
  /**
   * 获取列表
   */
  async getList(ctx) {
    let formData = ctx.request.body;
    let result = {
      success: false,
      message: "",
      data: null,
      code: "",
    };
    let articleResult = await articleService.getList(formData);
    if (articleResult) {
      result.success = true;
      result.message = "列表获取成功";
      result.data = articleResult;
      result.code = 200;
    } else {
      result.message = articleResult;
    }
    ctx.body = result;
  },
  /**
   * 新增
   */
  async add(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string(),
      img: Joi.string(),
      described: Joi.string(),
      type: Joi.string(),
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
    let data = {
      ...formData,
      created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: userObj.username,
      updated_by: userObj.username,
    };
    let articleResult = await articleService.add(data);
    // console.log(articleResult, 'articleResult');
    if (articleResult && articleResult.insertId * 1 > 0) {
      result.success = true;
      result.message = "添加成功";
      result.code = 200;
    } else {
      result.message = "添加失败";
    }
    ctx.body = result;
  },
  /**
   * 编辑
   */
  async edit(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
    const schema = Joi.object({
      id: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string(),
      img: Joi.string(),
      described: Joi.string(),
      type: Joi.string(),
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
    let data = {
      ...formData,
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_by: userObj.username,
    };
    let id = data.id;
    delete data.id;
    let articleResult = await articleService.edit(data, id);
    // console.log(articleResult, "articleResult");

    if (articleResult && articleResult.affectedRows * 1 > 0) {
      result.success = true;
      result.message = "编辑成功";
      result.code = 200;
    } else if (articleResult && articleResult.affectedRows * 1 == 0) {
      result.success = false;
      result.message = "id不存在";
      result.code = 400;
    } else {
      result.message = "编辑失败";
    }
    ctx.body = result;
  },
  /**
   * 删除
   */
  async delete(ctx) {
    let formData = ctx.query;
    let userObj = ctx.state.user.userInfo;
    // console.log(formData, "formData");
    const schema = Joi.object({
      id: Joi.number().required(),
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
    let data = {
      del_flag: 1,
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_by: userObj.username,
    };
    let articleResult = await articleService.edit(data, formData.id);
    if (articleResult && articleResult.affectedRows * 1 > 0) {
      result.success = true;
      result.message = "删除成功";
      result.code = 200;
    } else if (articleResult && articleResult.affectedRows * 1 == 0) {
      result.success = false;
      result.message = "id不存在";
      result.code = 400;
    } else {
      result.message = "删除失败";
    }
    ctx.body = result;
  },
};
