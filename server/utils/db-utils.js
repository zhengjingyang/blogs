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

// 分页查询数据
let findDataByPage = function (table, keys, start, end) {
  let _sql = "SELECT ?? FROM ?? LIMIT ?, ?";
  return query(_sql, [keys, table, start, end]);
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
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
};
