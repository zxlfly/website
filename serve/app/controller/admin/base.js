
'use strict';
const Controller = require('egg').Controller;
class BaseController extends Controller {
  async success(data,message) {
    this.ctx.body = {
      code: 200,
      data,
      message: message ?? '操作成功'
    };
  }
  async error(message) {
    this.ctx.body = {
      code: 0,
      data:{},
      message: message ?? '操作失败!',
    };
  }
}

module.exports = BaseController;
