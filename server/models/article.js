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
  async findDataByPage(data) {
    const { start, end, conditions, startTime, endTime } = { ...data };
    try {
      let result = await dbUtils.findDataByPage({
        table: "article",
        keys: ["id", "title", "type", "type_name", "created_time", "updated_time"],
        start,
        end,
        conditions,
        startTime,
        endTime
      });
      return result;
    } catch (error) {
      console.log(error, "error");
      ctx.throw(error);
    }
  },
  async getDetail(id) {
    try {
      let result = await dbUtils.findDataById("article", id);
      return result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, error);
    }
  },
};
