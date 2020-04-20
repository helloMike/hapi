//获取env
require('env2')('./.env');

//引入hapi
const Hapi = require('hapi');

//配置文件
const config = require('./config');

//路由文件api
const routesHelloHapi = require('./routes/hello-hapi');
const routesShopApi = require('./routes/shop');
const routesOrderApi = require('./routes/order');
const routesUsersApi = require('./routes/users');

/*----------------插件-------------------*/
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
//引入分页插件
const pluginHapiPagination = require('./plugins/hapi-pagination');
//引入jwt接口认证 hapi-jwt-auth2插件
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');

//创建服务
const server = new Hapi.Server();

//配置服务启动的host与端口
server.connection({
    port:config.port,
    host:config.host
})

//服务的初始化
const init = async ()=>{
    //路由
    server.route([
        //创建一个简单的hello api接口
        ...routesHelloHapi,
        ...routesShopApi,
        ...routesOrderApi,
        ...routesUsersApi
    ]);
    //注册插件
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
        pluginHapiPagination
    ]);
    //启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
