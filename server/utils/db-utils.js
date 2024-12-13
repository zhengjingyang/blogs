const allConfig = require("./../../config");
const config = allConfig.database;
const mysql = require("mysql2/promise");

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  waitForConnections: true, // 这个参数表示当所有的连接都在使用时，新的请求是否应该排队等待可用的连接
  connectionLimit: 10000, // 这个参数定义了连接池中同时可存在的最大连接数
  queueLimit: 0, // 这个参数定义了等待连接的请求队列的最大长度。0 表示请求队列的长度是无限的，所有的请求都会被放入队列中直到有可用的连接。
});

// 封装的查询函数
let query = async function (sql, values) {
  console.log(sql, values);

  try {
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

// 创建表
let createTable = function (sql) {
  return query(sql, []);
};

// 根据 ID 查找数据
let findDataById = function (table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
};

// 根据条件查询所有数据
let findData = async function (data) {
  let { table, keys, conditions, startTime, endTime } = { ...data };
  let conditionStr = "";
  let conditionValues = [];

  // 动态生成 WHERE 子句
  if (conditions && Object.keys(conditions).length > 0) {
    conditionStr =
      "WHERE " +
      Object.keys(conditions)
        .map((key) => {
          conditionValues.push(conditions[key]);
          return `${key} = ?`;
        })
        .join(" AND ");
  }

  // 添加时间筛选条件
  if (startTime && endTime) {
    if (conditionStr) {
      conditionStr += " AND created_time BETWEEN ? AND ?";
    } else {
      conditionStr = "WHERE created_time BETWEEN ? AND ?";
    }
    conditionValues.push(startTime, endTime);
  }

  // 确保默认 del_flag 不为 1
  if (conditionStr) {
    conditionStr += " AND del_flag != 1";
  } else {
    conditionStr = "WHERE del_flag != 1";
  }

  // 检查 keys 是否为 '*'
  let selectKeys = keys === "*" ? "*" : "??";

  let _sql = `SELECT ${selectKeys} FROM ?? ${conditionStr}`;

  // 参数数组，包含 keys（如果不是 '*'）、table、筛选条件值
  let listParams =
    keys === "*"
      ? [table, ...conditionValues]
      : [keys, table, ...conditionValues];

  let list = await query(_sql, listParams);

  return list;
};

let findDataByPage = async function (data) {
  let { table, keys, conditions, startTime, endTime, start, end } = { ...data };
  let conditionStr = "";
  let conditionValues = [];

  // 动态生成 WHERE 子句
  if (conditions && Object.keys(conditions).length > 0) {
    conditionStr =
      "WHERE " +
      Object.keys(conditions)
        .map((key) => {
          conditionValues.push(conditions[key]);
          return `${key} = ?`;
        })
        .join(" AND ");
  }

  // 添加时间筛选条件
  if (startTime && endTime) {
    if (conditionStr) {
      conditionStr += " AND created_time BETWEEN ? AND ?";
    } else {
      conditionStr = "WHERE created_time BETWEEN ? AND ?";
    }
    conditionValues.push(startTime, endTime);
  }

  // 确保默认 del_flag 不为 1
  if (conditionStr) {
    conditionStr += " AND del_flag != 1";
  } else {
    conditionStr = "WHERE del_flag != 1";
  }

  // 检查 keys 是否为 '*'
  let selectKeys = keys === "*" ? "*" : "??";

  let _sql = `SELECT ${selectKeys} FROM ?? ${conditionStr} LIMIT ?, ?`;

  // 参数数组，包含 keys（如果不是 '*'）、table、筛选条件值、分页起始值和结束值
  let listParams =
    keys === "*"
      ? [table, ...conditionValues, start, end]
      : [keys, table, ...conditionValues, start, end];

  let list = await query(_sql, listParams);

  // 查询总记录数
  let count_sql = `SELECT COUNT(*) AS total_count FROM ?? ${conditionStr}`;
  let countParams = [table, ...conditionValues];
  let countResult = await query(count_sql, countParams);
  let totalCount = countResult[0].total_count;

  return {
    list,
    totalCount,
  };
};

// 插入数据
let insertData = function (table, values) {
  let _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, values]);
};

// 更新数据
let updateData = function (table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?";
  return query(_sql, [table, values, id]);
};

// 根据 ID 删除数据
let deleteDataById = function (table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
};

// 查询数据
let select = function (table, keys) {
  let _sql = "SELECT ?? FROM ??";
  return query(_sql, [keys, table]);
};

// 统计数据条数
let count = function (table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ??";
  return query(_sql, [table]);
};

module.exports = {
  query,
  createTable,
  findDataById,
  findData,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
};
