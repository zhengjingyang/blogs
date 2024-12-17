const dictModal = require("../models/dict");
module.exports = {
  async add(data) {
    // console.log(data, 'data');
    let dictId = null;
    try {
      let params = JSON.parse(JSON.stringify(data));
      delete params.list;
      let result = await dictModal.addDict(params);
      dictId = result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
    if (dictId) {
      let list = data.list.map((item) => {
        return {
          ...item,
          dictionary_id: dictId,
        };
      });
      let result = await dictModal.addDictItem(list);
      console.log(result, "result");
      
      return result;
    }
  },
  async edit(data) {
    let dictId = data.id;
    let list = data.list;
    try {
      let params = JSON.parse(JSON.stringify(data));
      delete params.list;
      delete params.id;
      let result = await dictModal.updateDict(params, dictId);
      // return result;
      console.log(result, "result");
      
    } catch (error) {
      console.log(error);
      return false;
    }
    let result = await dictModal.updateDictItem(list);
    return result;
  },
  async delete(id) {
    let result = await dictModal.deleteDict(id);
    return result;
  },
  getList(data) {
    let pageSize = data.pageSize || 10;
    let pageNum = data.pageNum || 1;
    let params = {
      start: pageSize * (pageNum - 1),
      end: pageSize * pageNum,
      conditions: {},
    };
    if (data.name) {
      params.conditions["name"] = data.name;
    }
    if (data.code) {
      params.conditions["code"] = data.code;
    }

    return dictModal.getList(params);
  },
  async getDataById(id) {
    let params = {
      dictionary_id: id,
    };
    let result = await dictModal.getDictDataById(params);
    return result;
  },
};
