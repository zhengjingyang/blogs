const articleTypeModel = require("../models/articleType");
module.exports = {
  async getList(data) {
    let params = {
      conditions: {}
    };
    if (data?.name) {
      params.conditions["name"] = data.name;
    }
    let result = await articleTypeModel.findData(params);
    let treeList = this.listTrunTree(result);
    return treeList;
  },
  listTrunTree(list) {
    let treeList = [];
    let map = {};
    list.forEach((item) => {
      map[item.id] = item;
    });
    list.forEach((item) => {
      let parent = map[item.parent_id];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        treeList.push(item);
      }
    });
    return treeList;
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
