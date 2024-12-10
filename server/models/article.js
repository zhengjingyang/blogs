const dbUtils = require("../utils/db-utils");
module.exports = {
  async add(model) {
    let result = await dbUtils.insertData("article", model);
    return result;
  }
};
