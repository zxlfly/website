'use strict';
const BaseController = require('../base');

class HomeController extends BaseController {
  // 获取文章列表
  async index() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    try {
      let { page, size } = ctx.request.body
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
        attributes: ['id','introduction','pid','sort','title']
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
  async getNav() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.tools.getTreeData({ id: 'pid', val: 0 }, ctx.model.Category)
      // console.log('list',list);
      this.success({ list });
    } catch (e) {
      console.log(e);
      this.error('出错了');
    }
  }
  // 根据id获取文章列表
  async getList() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    try {
      let { page, size, id } = ctx.request.body
      page = Number(page)
      size = Number(size)
      if (page < 1 || size < 0 || id < 1) {
        return this.error('参数不合法')
      }
      // 计算需要跳过多少条
      const offset = (page - 1) * size

      const { count, rows } = await ctx.model.Article.findAndCountAll({
        order: [['sort', 'DESC']],
        offset,
        limit: size,
        where: {
          pid: id
        }
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
  // 获取文章详情
  async getDetail() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const res = await ctx.model.Article.findByPk(id)
    if (res) {
      this.success(res)
    } else {
      this.error('文章不存在')
    }
  }
  // 获取网站信息
  async getInfo() {

  }
  // 获取ad !todo
  async getAd() {

  }
}

module.exports = HomeController;
