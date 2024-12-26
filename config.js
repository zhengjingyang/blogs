const config = {
  port: 3001,
  database: {
    DATABASE: "blogs",
    USERNAME: "root",
    PASSWORD: "password@2024",
    PORT: "3066",
    HOST: "124.70.135.97",
  },
  minio: {
    HOST: "124.70.135.97",
    PORT: 9002,
    USESSL: false,
    ACCESSKEY: "admin",
    SECRETKEY: "password@2024",
  },
  redis: {
    HOST: "124.70.135.97",
    PORT: 6379,
    PASSWORD: "password@2024",
  },
};

module.exports = config;
