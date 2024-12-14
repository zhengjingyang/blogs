const dbUtils = require("../utils/db-utils");
module.exports = {
  async findData(data) {
    const { conditions } = { ...data };
    try {
      let result = await dbUtils.findData("article_type", "*", conditions);
      return result;
    } catch (error) {
      console.log(error, "error");
      ctx.throw(error);
    }
  },
  async addData(data) {
    try {
      let result = await dbUtils.insertData("article_type", data);
      return result;
    } catch (error) {
      console.log(error, "error");
      ctx.throw(error);
    }
  },
  async updateData(data, id) {
    try {
      let result = await dbUtils.updateData("article_type", data, id);
      return result;
    } catch (error) {
      console.log(error, "error");
      ctx.throw(error);
    }
  },
};
