const Joi = require('joi');
const { paginationDefine,jwtHeaderDefine} = require('../utils/router-helper');

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
            auth: false,
            validate:{
                ...jwtHeaderDefine,
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
            // 增加带有 where 的条件查询
            const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
                // 基于 shop_id 的条件查询
                where: {
                    shop_id: request.params.shopId,
                },
                attributes: [
                    'id',
                    'name',
                ],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            reply({results,totalCount});
        },
        config:{
            auth: false,
            tags:['api',GROUP_NAME],
            description:'获取店铺的商品列表',
            validate:{
                ...jwtHeaderDefine,
                params: {
                    shopId: Joi.string().required().description('店铺的id'),
                },
                query: {
                    ...paginationDefine
                }
            }
        }
    }
]
