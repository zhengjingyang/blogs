const articleTypeService = require('../services/articleType');
const Joi = require('joi');
const dayjs = require('dayjs');
module.exports= {
    async getList(ctx) {
        let fromData = ctx.request.body;
        let result = {
            success: false,
            message: "",
            data: null,
            code: ""
        }
        let articleTypeResult = await articleTypeService.getList(fromData);
        console.log(articleTypeResult, 'articleTypeResult');
        
        if (articleTypeResult) {
            result.success = true;
            result.message = "获取成功";
            result.data = articleTypeResult;
            result.code = "200";
        } else {
            result.message = "获取失败";
            result.code = "500";
        }
        ctx.body = result;
    },
    async add(ctx) {
        let fromData = ctx.request.body;
        let userObj = ctx.state.user.userInfo;
        const schema = Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
            parent_id: Joi.number(),
        }).validate(fromData);
        if (schema.error) {
            ctx.throw(400, schema.error.details[0].message);
            return;
        }
        let result = {
            success: false,
            message: "",
            data: null,
            code: ""
        }
        let data = {
            name: fromData.name,
            type: fromData.type,
            parent_id: fromData.parent_id || 0,
            created_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            created_by: userObj.username,
            updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            updated_by: userObj.username,
        }
        let articleTypeResult = await articleTypeService.add(data);
        if (articleTypeResult && articleTypeResult.insertId * 1 > 0) {
            result.success = true;
            result.message = "添加成功";
            result.code = "200";
        } else {
            result.message = "添加失败";
            result.code = "400";
        }
        ctx.body = result;
    },
    async update(ctx) {
        let fromData = ctx.request.body;
        let userObj = ctx.state.user.userInfo;
        const schema = Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
            parent_id: Joi.number(),
            id: Joi.number().required(),
        }).validate(fromData);
        if (schema.error) {
            ctx.throw(400, schema.error.details[0].message);
            return;
        }
        let result = {
            success: false,
            message: "",
            data: null,
            code: ""
        }
        let data = {
            name: fromData.name,
            type: fromData.type,
            updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            updated_by: userObj.username,
        }
        let articleTypeResult = await articleTypeService.update(data, fromData.id);
        if (articleTypeResult && articleTypeResult.affectedRows * 1 > 0) {
            result.success = true;
            result.message = "更新成功";
            result.code = "200";
        } else {
            result.message = "更新失败";
            result.code = "400";
        }
        ctx.body = result;
    },
    async delete(ctx) {
        let fromData = ctx.query;
        let userObj = ctx.state.user.userInfo;
        const schema = Joi.object({
            id: Joi.number().required(),
        }).validate(fromData);
        if (schema.error) {
            ctx.throw(400, schema.error.details[0].message);
            return;
        }
        let result = {
            success: false,
            message: "",
            data: null,
            code: ""
        }
        let data = {
            del_flag: 1,
            updated_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            updated_by: userObj.username,
        }
        let articleTypeResult = await articleTypeService.update(data, fromData.id);
        if (articleTypeResult && articleTypeResult.affectedRows * 1 > 0) {
            result.success = true;
            result.message = "删除成功";
            result.code = "200";
        } else if (articleTypeResult && articleTypeResult.affectedRows * 1 === 0) {
            result.message = "数据不存在";
            result.code = "400";
        } else {
            result.message = "删除失败";
            result.code = "400";
        }
        ctx.body = result;

    },
}