'use strict';
const BaseController = require('./base');
class CategoryController extends BaseController {
  async index() {
    const { ctx, app } = this;
    this.success({ });
  }
  async add() {
    const { ctx, app } = this;
    this.success({ });
  }
  async edit(){
    this.success({ });
  }
  async del(){
    this.success({ });
  }
}

module.exports = CategoryController;
