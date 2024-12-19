const Joi = require("joi");
const minioClient = require("../utils/minioClient");
const allConfig = require("./../../config");
const config = allConfig.minio;
const dayjs = require("dayjs"); // 引入 dayjs
module.exports = {
  /**
   * 获取列表
   */
  getList(ctx) {
    let formData = ctx.request.body;
    let userObj = ctx.state.user.userInfo;
  },
  /**
   * 新增
   */
  async upload(ctx) {
    const { nanoid } = await import("nanoid"); // 用于生成唯一文件名
    const file = ctx.request.files.file; // 获取上传的文件

    // 使用 dayjs 获取当前日期的年、月、日
    const now = dayjs();
    const year = now.year();
    const month = now.format("MM"); // 格式化月为两位数
    // 创建文件路径：按年/月/日分组
    const bucketName = "blogs";
    const folderPath = `${year}/${month}`;
    const objectName = `${folderPath}/${nanoid()}-${
      file.originalFilename || file.name
    }`;

    try {
      // 上传文件到 MinIO
      await minioClient.fPutObject(bucketName, objectName, file.filepath, {
        "Content-Type": file.mimetype || file.type,
      });
      const protocol = config.USESSL ? "https" : "http";
      const endPoint = config.HOST;
      const port = config.PORT;

      ctx.body = {
        success: true,
        code: 200,
        message: "File uploaded successfully",
        data: `${protocol}://${endPoint}:${port}/${bucketName}/${objectName}`,
      };
    } catch (error) {
      console.error("File upload error:", error);
      ctx.throw(500, "File upload failed");
    }
  },
};
