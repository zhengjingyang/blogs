const articleTypeModel = require("../models/articleType");
module.exports = {
  async getList(data) {
    let params = {
      conditions: {}
    };
    if (data.name) {
      params.conditions["name"] = data.name;
    }
    let result = await articleTypeModel.findData(params);
    return result;
  },
  async add(data) {
    let result = await articleTypeModel.addData(data);
    return result;
  },
  async update(data, id) {
    let result = await articleTypeModel.updateData(data, id);
    return result;
  }
};
