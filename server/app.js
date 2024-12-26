const path = require("path");
const Koa = require("koa");
const convert = require("koa-convert");
const views = require("koa-views");
const koaStatic = require("koa-static");
const koaLogger = require("koa-logger");
const session = require("koa-session-minimal"); // 可以在服务器端存储用户会话信息
const RedisStore = require("koa-redis");
const config = require("../config");
const json = require("koa-json"); // 用来格式化 JSON 响应数据
const onerror = require("koa-onerror"); // 统一处理应用中的错误
const routers = require("./routers/index");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");

require("./utils/global");

const app = new Koa();

// 配置 Redis 连接
const redisOptions = {
  host: config.redis.HOST,
  port: config.redis.PORT,
  password: config.redis.PASSWORD,
};
// 配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new RedisStore(redisOptions),
    cookie: {
      maxAge: 1000 * 60 * 30, // 30分钟
      httpOnly: true,
    },
  })
);

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 使用 @koa/cors 中间件来允许跨域请求
app.use(cors());

// 配置 koa-body 中间件
app.use(koaBody({ multipart: true }));
// app.use(async (ctx) => {
//   if (ctx.method === "POST" && ctx.is("multipart/form-data")) {
//     const file = ctx.request.files.file; // 访问上传的文件
//     ctx.body = { file: file.name };
//   } else {
//     ctx.body = ctx.request.body; // 访问解析后的请求体
//   }
// });

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, "../static"))));

// 配置服务端模板渲染引擎中间件
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.use(json());
// error handler
onerror(app);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit("error", err, ctx); // 触发错误事件
  }
});

// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
