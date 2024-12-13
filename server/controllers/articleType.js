const articleTypeService = require('../services/articleType');
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
        if (articleTypeResult) {
            result.success = true;
            result.message = "获取成功";
            result.data = articleTypeResult.data;
            result.code = "200";
        } else {
            result.message = "获取失败";
            result.code = "500";
        }
        ctx.body = result;
    },
    add() {},
    update() {},
    delete() {},
}