const Joi = require('joi');
const { paginationDefine } = require('../utils/router-helper');

// 引入 models
const models = require("../models");

const GROUP_NAME = 'shops';

module.exports = [
    {
        method:'GET',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply)=>{
            // 通过 await 来异步查取数据
          const {rows:results,count:totalCount} = await models.shops.findAndCountAll({
              attributes:[
                  'id',
                  'name'
              ],
              limit:request.query.limit,
              offset:(request.query.page - 1) * request.query.limit
          });
            reply({results,totalCount});
        },
        config:{
            tags:['api',GROUP_NAME],
            description: '获取店铺列表',
            validate:{
                query: {
                    ...paginationDefine
                }
            }
        }
    },
    {
        method:'GET',
        path:`/${GROUP_NAME}/{shopId}/goods`,
        handler:async (request,reply)=>{
            reply();
        },
        config:{
            tags:['api',GROUP_NAME],
            description:'获取店铺的商品列表',
        }
    }
]
