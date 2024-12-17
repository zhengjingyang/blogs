const Joi = require("joi");
const dayjs = require("dayjs");
const dictService = require("../services/dict");
module.exports = {
  async getList(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    const schema = Joi.object({
      name: Joi.string(),
      code: Joi.string(),
      pageNum: Joi.number().default(1),
      pageSize: Joi.number().default(10),
    }).validate(formData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    let result = await dictService.getList(formData);
    if (result) {
      ctx.body = {
        success: true,
        message: "查询成功",
        data: result,
        code: 200,
      };
    } else {
      ctx.body = {
        success: false,
        message: "查询失败",
        data: null,
        code: 500,
      };
    }
  },
  async getDataById(ctx) {
    let queryData = ctx.query;
    const schema = Joi.object({
      id: Joi.number().required(),
    }).validate(queryData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    let result = await dictService.getDataById(Number(queryData.id));
    // console.log(result);

    if (result && result.length > 0) {
      ctx.body = {
        success: true,
        message: "查询成功",
        data: result,
        code: 200,
      };
    } else {
      ctx.body = {
        success: false,
        message: "查询失败",
        data: null,
        code: 500,
      };
    }
  },
  async add(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    // console.log(formData, 'formData');
    // 从上下文中获取用户信息
    let userObj = ctx.state.user.userInfo;
    // 使用 Joi 验证表单数据
    const schema = Joi.object({
      name: Joi.string().required(),
      code: Joi.string().required(),
      sort_order: Joi.number(),
      list: Joi.array().items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.string().required(),
          sort_order: Joi.number(),
        })
      ),
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
    // 准备要插入到数据库的数据
    let data = {
      // 解构赋值，将 formData 中的属性复制到 data 中
      ...formData,
      // 创建时间
      created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      // 创建人
      created_by: userObj.username,
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_by: userObj.username,
    };

    // 调用服务层的 add 方法插入数据
    let dictResult = await dictService.add(data);
    console.log(dictResult, "dictResult");

    // 如果插入成功，设置操作结果对象的属性
    if (dictResult) {
      result.success = true;
      result.message = "添加成功";
      result.data = dictResult;
      result.code = 200;
    } else {
      result.message = "添加失败";
      result.code = 500;
    }
    // 返回操作结果对象
    ctx.body = result;
  },
  async edit(ctx) {
    // 从请求体中获取表单数据
    let formData = ctx.request.body;
    // 从上下文中获取用户信息
    let userObj = ctx.state.user.userInfo;
    // 使用 Joi 验证表单数据
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      code: Joi.string().required(),
      sort_order: Joi.number(),
      list: Joi.array().items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.string().required(),
          sort_order: Joi.number(),
        })
      ),
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
    // 调用服务层的 edit 方法更新数据
    let dictResult = await dictService.edit(data);
    // 如果更新成功，设置操作结果对象的属性
    if (dictResult) {
      result.success = true;
      result.message = "更新成功";
      result.data = dictResult;
      result.code = 200;
    } else {
      result.message = "更新失败";
      result.code = 500;
    }
  },
  async delete(ctx) {
    let queryData = ctx.query;
    const schema = Joi.object({
      id: Joi.number().required(),
    }).validate(queryData);
    if (schema.error) {
      ctx.throw(400, schema.error.details[0].message);
      return;
    }
    let data = {
      id: Number(queryData.id),
      del_flag: 1,
      updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated_by: ctx.state.user.userInfo.username,
    }
    let result = dictService.edit(data);
    if (result) {
      ctx.body = {
        success: true,
        message: "删除成功",
        data: result,
        code: 200,
      };
    } else {
      ctx.body = {
        success: false,
        message: "删除失败",
        data: null,
        code: 500,
      };
    }
  },
};
