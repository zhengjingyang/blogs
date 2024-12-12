const dbUtils = require("../utils/db-utils");
module.exports = {
  async add(model) {
    let result = await dbUtils.insertData("article", model);
    return result;
  },
  async edit(model, id) {
    try {
      let result = await dbUtils.updateData("article", model, id);
      return result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, error);
    }
  },
  async findDataByPage(start, end, conditions, startTime, endTime) {
    try {
      let result = await dbUtils.findDataByPage(
        "article",
        "*",
        start,
        end,
        conditions,
        startTime,
        endTime
      );
      return result;
    } catch (error) {
      console.log(error, "error");
      ctx.throw(error);
    }
  },
};
