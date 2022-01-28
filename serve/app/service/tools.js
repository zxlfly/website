'use strict';
// const svgCaptcha = require('svg-captcha');
const md5 = require('md5');
const path = require('path');
const Service = require('egg').Service;
class ToolsService extends Service {
  // async captcha() {
  //   const captcha = svgCaptcha.create({
  //     size: 4,
  //     fontSize: 50,
  //     width: 100,
  //     height: 40,
  //   });
  //   this.ctx.session.code = captcha.text;
  //   return captcha;
  // }
  async md5(str) {
    return md5(str);
  }
  async getTime() {
    const d = new Date();
    return d.getTime();
  }
}
module.exports = ToolsService;
