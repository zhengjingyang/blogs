const Joi = require("joi");
const articleService = require("../services/article");
module.exports = {
  /**
   * 获取文章列表
   * @param {Object} ctx.request.body - 请求体中的表单数据
   * @returns {Object} - 操作结果
   */
  async getList(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    // 初始化操作结果对象
    let result = {
      success: false,
      message: "",
      data: null,
      code: "",
    };
    // 调用服务层的 getList 方法获取文章数据
    let articleResult = await articleService.getList(formData || {});
    // 如果获取成功，设置操作结果
    if (articleResult) {
      result.success = true;
      result.message = "列表获取成功";
      result.data = articleResult;
      result.code = 200;
    } else {
      // 如果获取失败，设置错误信息
      result.message = articleResult;
    }
    // 返回操作结果
    ctx.body = result;
  },
  /**
   * 添加文章
   * @param {Object} ctx - Koa 上下文对象
   * @param {Object} ctx.request - 请求对象
   * @param {Object} ctx.request.body - 请求体中的表单数据
   * @param {Object} ctx.state.user - 用户信息对象
   * @param {Object} ctx.state.user.userInfo - 用户详细信息
   * @returns {Object} - 操作结果
   */
  async add(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    // 从上下文中获取用户信息
    let userObj = ctx.state.user.userInfo;
    // 使用 Joi 验证表单数据
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string(),
      img: Joi.string(),
      described: Joi.string().required(),
      type: Joi.number().required(),
      type_name: Joi.string().required(),
    }).validate(formData);
    // 如果验证失败，抛出错误
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    // 初始化操作结果对象
    let result = {
      success: false,
      message: "",
      data: null,
      code: "",
    };
    // 准备要添加到数据库的数据
    let data = {
      ...formData,
      created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: userObj.username,
      updated_by: userObj.username,
    };
    // 调用服务层的 add 方法添加数据
    let articleResult = await articleService.add(data);
    // console.log(articleResult, 'articleResult');
    // 如果添加成功，设置操作结果
    if (articleResult && articleResult.insertId * 1 > 0) {
      result.success = true;
      result.message = "添加成功";
      result.code = 200;
      result.data = articleResult.insertId;
    } else {
      // 如果添加失败，设置错误信息
      result.message = "添加失败";
      result.code = 400;
      result.data = null;
    }
    // 返回操作结果
    ctx.body = result;
  },

  /**
   * 编辑文章
   * @param {Object} ctx - Koa 上下文对象
   * @param {Object} ctx.request - 请求对象
   * @param {Object} ctx.request.body - 请求体中的表单数据
   * @param {Object} ctx.state.user - 用户信息对象
   * @param {Object} ctx.state.user.userInfo - 用户详细信息
   * @returns {Object} - 操作结果
   */
  async edit(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    // 从上下文中获取用户信息
    let userObj = ctx.state.user.userInfo;
    // 使用 Joi 验证表单数据
    const schema = Joi.object({
      // 文章id，必填
      id: Joi.number().required(),
      // 文章标题，必填
      title: Joi.string().required(),
      // 文章内容
      content: Joi.string(),
      // 文章图片
      img: Joi.string(),
      // 文章描述
      described: Joi.string().required(),
      // 文章类型
      type: Joi.number().required(),
      // 文章类型名称
      type_name: Joi.string().required(),
    }).validate(formData);
    // 如果验证失败，抛出错误
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    // 初始化操作结果对象
    let result = {
      success: false,
      message: "",
      data: null,
      code: "",
    };
    // 准备要更新到数据库的数据
    let data = {
      // 解构赋值，将 formData 中的属性复制到 data 中
      ...formData,
      // 更新时间
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      // 更新人
      updated_by: userObj.username,
    };
    // 获取文章id
    let id = data.id;
    // 从 data 中删除 id 属性
    delete data.id;
    // 调用服务层的 edit 方法更新数据
    let articleResult = await articleService.edit(data, id);

    // 如果更新成功，设置操作结果
    if (articleResult && articleResult.affectedRows * 1 > 0) {
      result.success = true;
      result.message = "编辑成功";
      result.code = 200;
    }
    // 如果更新失败，且受影响的行数为0，设置错误信息
    else if (articleResult && articleResult.affectedRows * 1 == 0) {
      result.success = false;
      result.message = "id不存在";
      result.code = 400;
    }
    // 如果更新失败，设置错误信息
    else {
      result.message = "编辑失败";
    }
    // 返回操作结果
    ctx.body = result;
  },
  /**
  
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

  /**
   * 获取文章详情
   */
  async detail(ctx) {
    let formData = ctx.query;
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
    let articleResult = await articleService.getDetail(formData.id);
    if (articleResult) {
      result.success = true;
      result.message = "获取成功";
      result.code = 200;
      result.data = articleResult;
    } else {
      result.message = "获取失败";
    }
    ctx.body = result;
  },
};
