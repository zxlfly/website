'use strict';
const BaseController = require('../base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserController extends BaseController {
  async login() {
    const { ctx, app } = this;
    const { name, pwd } = ctx.request.body;
    console.log({ name, pwd });
    const password = await this.service.tools.md5(pwd+this.config.HashSalt)
    const user = await ctx.model.User.findOne({ 
      where: { 
        name,
        pwd:password
      } 
    });
    // console.log(user);
    if (!user) {
      return this.error('用户名或密码错误');
    }
    // 生成token
    const token = jwt.sign({
      _id: user.dataValues.id,
      name,
    }, app.config.jwt.secret, {
      expiresIn: '24h',
    });
    this.success({name,token});
  }
}

module.exports = UserController;
