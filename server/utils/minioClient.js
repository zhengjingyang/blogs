// minioClient.js
const Minio = require("minio");
const allConfig = require("./../../config");
const config = allConfig.minio;

const minioClient = new Minio.Client({
  endPoint: config.HOST, // MinIO 服务器地址
  port: config.PORT, // MinIO 端口
  useSSL: config.USESSL, // 如果使用 HTTPS，请设置为 true
  accessKey: config.ACCESSKEY,
  secretKey: config.SECRETKEY,
});

module.exports = minioClient;
