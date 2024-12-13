const articleTypeModel = require("../models/articleType");
module.exports = {
  async getList(data) {
    let params = {
      conditions: {},
    };
    if (data.name) {
      params.conditions["name"] = data.name;
    }
    let result = await articleTypeModel.findData(params);
    return result
  },
};
