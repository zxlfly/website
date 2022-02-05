'use strict';
const BaseController = require('../base');

class HomeController extends BaseController {
  // 获取文章列表
  async index() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    try {
      let { page, size, keywords, searchDate, selectedType } = ctx.request.body
      page = Number(page)
      size = Number(size)
      if (page < 1 || size < 0) {
        return this.error('参数不合法')
      }
      // 计算需要跳过多少条
      const offset = (page - 1) * size
      
      const { count, rows } = await ctx.model.Article.findAndCountAll({
        order: [['created_at', 'DESC']],
        offset,
        limit: size,
      });
      // console.log(count, rows)
      if (rows) {
        this.success({ list: rows, count });
      } else {
        this.error('获取文章列表失败')
      }
    } catch (e) {
      console.log(e);
      this.error('获取文章列表失败')
    }
  }
  // 获取分类导航
  async getList(){

  }
  // 获取文章详情
  async getDetail(){

  }
  // 获取网站信息
  async getInfo(){

  }
  // 获取ad !todo
  async getAd(){
    
  }
}

module.exports = HomeController;
