'use strict';
const BaseController = require('./base');
class ArticleController extends BaseController {
  async index() {
    const { ctx, app } = this;
    console.log(ctx.query);
    try {
      let {id, page, size } = ctx.query
      page = Number(page)
      size = Number(size)
      if (page < 1 || size < 0) {
        return this.error('参数不合法')
      }
      // 计算需要跳过多少条
      const offset = (page - 1) * size
      // 跳过5个实例,然后获取5个实例
      // Project.findAll({ offset: 5, limit: 5 });
      // 返回总的页数
      let params = {
        offset,
        limit: size,
      }
      if(id){
        params['where']={
          id
        }
      }
      const { count, rows } = await ctx.model.Article.findAndCountAll(params);
      console.log(count, rows)
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
    const { articleId, pid, title, introduction, content } = ctx.request.body;
    console.log(ctx.request.body);
    try {
      const ret = await ctx.model.Article.create({
        pid, title, introduction, content
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
    const { id ,pid, title, introduction, content} = ctx.request.body;
    console.log(ctx.request.body);
    // return this.error({}, '编辑失败')
    const ret = await ctx.model.Article.findByPk(id);
    try{
      if (ret) {
        const ret = await ctx.model.Article.update(
          { pid, title, introduction, content, },
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
    }catch(e){
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
