//获取env
require('env2')('./.env');

//引入hapi
const Hapi = require('hapi');

//配置文件
const config = require('./config');

//路由文件
const routesHelloHapi = require('./routes/hello-hapi');

// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
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
    ]);
    //注册插件
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger
    ]);
    //启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();