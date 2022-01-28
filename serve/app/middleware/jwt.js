'use strict';
// 解析token的中间件，也可以用egg-jwt
const jwt = require('jsonwebtoken');
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: -1,
        message: '请登录',
      };
      return;
    }
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    if (token) {
      try {
        const ret = await jwt.verify(token, app.config.jwt.secret);
        if (ret) {
          await next();
        } else {
          ctx.body = {
            code: -1,
            message: 'token信息错误',
          };
        }
      } catch (err) {
        console.log(err);
        if (err.name === 'TokenExpiredError') {
          ctx.body = {
            code: -1,
            message: '登录已过期',
          };
        } else {
          ctx.body = {
            code: -1,
            message: '用户信息错误',
          };
        }

      }
    } else {
      ctx.body = {
        code: -1,
        message: 'token信息错误',
      };
    }
  };
};
