'use strict';
const BaseController = require('../base');
const sequelize = require('sequelize')
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');
const pump = require('mz-modules/pump');
class uploadController extends BaseController {
  async uploadfile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    // 上传图片的目录
    const dir = await this.service.tools.getUploadFile(file.filename);
    console.log('file',dir);
    const target = dir.uploadDir;
    await fse.move(file.filepath, target);
    // const writeStream = fs.createWriteStream(target);
    // await pump(file.filepath, writeStream);
    this.success({ url: dir.saveDir });
  }
}

module.exports = uploadController;
