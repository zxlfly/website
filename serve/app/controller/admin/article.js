'use strict';
const BaseController = require('./base');
class ArticleController extends BaseController {
  async index() {
    const { ctx, app } = this;
    this.success({ });
  }
  async add() {
    const { ctx, app } = this;
    this.success({ });
  }
  async getCache(){
    this.success({ });
  }
  async cache(){
    this.success({ });
  }
  async delCache(){
    this.success({ });
  }
}

module.exports = ArticleController;
