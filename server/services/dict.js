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
  edit() {},
  delete() {},
  getList(data) {
    return dictModal.getList(data);
  },
};
