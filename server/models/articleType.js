const dbUtils = require('../utils/db-utils')
module.exports = {
    async findDataByPage (data) {
        const { start, end, conditions} = { ...data };
        try {
            let result = await dbUtils.findDataByPage(
              "article_type",
              "*",
              start,
              end,
              conditions
            );
            return result;
          } catch (error) {
            console.log(error, "error");
            ctx.throw(error);
          }
    }
}