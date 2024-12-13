const articleTypeModel = require('../models/articleType');
module.exports = {
    async getList(data) {
        let pageNum = data.pageNum || 1;
        let pageSize = data.pageSize || 10;
        let params = {
            start: pageSize * (pageNum - 1),
            end: pageSize * pageNum,
            conditions: {},
        }
        if (data.name) {
            params.conditions["name"] = data.name;
        }
        let result = await articleTypeModel.findDataByPage(
            params.start,
            params.end,
            params.conditions
        );
        return {
            list: result.list,
            pageNum,
            pageSize,
            totalCount: result.totalCount,
        };
    }
}