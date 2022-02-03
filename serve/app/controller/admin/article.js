'use strict';
const BaseController = require('./base');
const { Op } = require('sequelize')
class ArticleController extends BaseController {
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
      let selectedTypeObj = {}
      // 根据分类查询
      if (selectedType != -1) {
        selectedTypeObj = {
          pid: selectedType
        }
      }
      // 根基关键词模糊匹配
      let keywordsobj = {}
      if (keywords != '') {
        keywordsobj = { title: { [Op.like]: `%${keywords}%` } }
      }
      // 根据时间段匹配
      let serachDateObj
      if (searchDate[0] != '' && searchDate[1] != '') {
        serachDateObj = {
          created_at: {
            [Op.between]: [...searchDate]
          }
        }
      }
      console.log({
        order: [['updated_at', 'DESC']],
        offset,
        limit: size,
        where: {
          ...selectedTypeObj,
          ...keywordsobj,
          ...serachDateObj
        }
      });
      const { count, rows } = await ctx.model.Article.findAndCountAll({
        where: {
          ...selectedTypeObj,
          ...keywordsobj,
          ...serachDateObj
        },
        order: [['updated_at', 'DESC']],
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
  async add() {
    const { ctx, app } = this;
    const { articleId, pid, title, introduction, content, sort } = ctx.request.body;
    console.log(ctx.request.body);
    try {
      const ret = await ctx.model.Article.create({
        pid, title, introduction, content, sort
      })
      if (ret) {
        if (articleId != -1) {
          const del = await ctx.model.Articlecatche.destroy(
            {
              where: {
                id: articleId
              }
            }
          )
          if (del) {
            this.success({}, '添加文章成功')
          } else {
            this.success({}, '添加文章成功,但是缓存清除失败')
          }
        } else {
          this.success({}, '添加文章成功')
        }

      } else {
        this.error('添加文章失败');
      }
    } catch (e) {
      console.log(e);
      this.error('添加文章失败');
    }
  }
  async getArticle() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const res = await ctx.model.Article.findByPk(id)
    if (res) {
      this.success(res)
    } else {
      this.error('文章不存在')
    }
  }
  async editArticle() {
    const { ctx, app } = this;
    const { id, pid, title, introduction, content, sort } = ctx.request.body;
    console.log(ctx.request.body);
    // return this.error({}, '编辑失败')
    const ret = await ctx.model.Article.findByPk(id);
    try {
      if (ret) {
        const ret = await ctx.model.Article.update(
          { pid, title, introduction, content, sort },
          {
            where: {
              id
            }
          }
        )
        if (ret) {
          this.success({}, '编辑成功')
        } else {
          this.error({}, '编辑失败')
        }
      } else {
        this.error({}, '编辑失败')
      }
    } catch (e) {
      console.log(e);
    }
  }
  async delArticle() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    console.log(ctx.request.body);
    const del = await ctx.model.Article.destroy(
      {
        where: {
          id
        }
      }
    )
    if (del) {
      this.success()
    } else {
      this.error('删除失败')
    }
  }
  async getCache() {
    const { ctx, app } = this;
    try {
      const ret = await ctx.model.Articlecatche.findAll({ raw: true });
      // console.log('ret:',ret);
      if (ret.length) {
        this.success(ret[0], '获取缓存成功')
      } else {
        this.success({ id: -1 }, '暂无缓存')
      }
    } catch (err) {
      // console.log(err);
      this.error('获取缓存失败')
    }
  }
  async addCache() {
    const { ctx, app } = this;
    const { id, pid, title, introduction, content } = ctx.request.body;
    // console.log(ctx.request.body);
    const createCatche = async () => {
      const ret = await ctx.model.Articlecatche.create({
        pid,
        title,
        introduction,
        content,
      })
      if (ret) {
        this.success({}, '缓存成功')
      }
    }
    try {
      if (id == -1) {
        await createCatche()
      } else {
        const ret = await ctx.model.Articlecatche.findByPk(id);
        if (ret) {
          const ret = await ctx.model.Articlecatche.update(
            { pid, title, introduction, content, },
            {
              where: {
                id
              }
            }
          )
          if (ret) {
            this.success({}, '缓存成功')
          } else {
            this.success({}, '缓存失败')
          }
        } else {
          await createCatche()
        }
      }
    } catch (e) {
      console.log(e);
      this.error('缓存失败')
    }
  }
  async delCache() {
    this.success({});
  }
}

module.exports = ArticleController;
