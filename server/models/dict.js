const dbUtils = require("../utils/db-utils");
module.exports = {
  async addDict(model) {
    let result = await dbUtils.insertData("sys_dict", model);
    return result;
  },
  async addDictItem(models) {
    let num = 0;
    for (let item of models) {
      let result = await dbUtils.insertData("sys_dict_item", item);
      if (result.affectedRows > 0) {
        num++;
      }
    }

    if (num === models.length) {
      return true;
    } else {
      return false;
    }
  },
  async edit(model, id) {
    try {
      let result = await dbUtils.updateData("sys_dict", model, id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  async delete(id) {
    try {
      let result = await dbUtils.deleteDataById("sys_dict", id);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  async getList(data) {
    let result = await dbUtils.findDataByPage({
      table: "sys_dict",
      keys: "*",
      ...data,
    });
    return result;
  },
};
