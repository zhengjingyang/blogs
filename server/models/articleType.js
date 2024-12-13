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
};
