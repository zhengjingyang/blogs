const path = require("path");
const Koa = require("koa");
const convert = require("koa-convert");
const views = require("koa-views");
const koaStatic = require("koa-static");
const bodyparser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const session = require("koa-session-minimal"); // 可以在服务器端存储用户会话信息
// const MysqlStore = require("koa-mysql-session");
const RedisStore = require("koa-redis");

const config = require("../config");

const json = require("koa-json"); // 用来格式化 JSON 响应数据
const onerror = require("koa-onerror"); // 统一处理应用中的错误

const routers = require("./routers/index");
const app = new Koa();

// session存储配置
// const sessionMysqlConfig = {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
//   connectTimeout: 10000, // 设置为 10 秒
// };
// const store = new MysqlStore(sessionMysqlConfig);

// 配置 Redis 连接
const redisOptions = {
  host: "124.70.135.97",
  port: 6379, // Redis 默认端口
  password: "password@2024", // 如果没有设置密码，这行可以省略
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

// 配置ctx.body解析中间件
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);

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

// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
