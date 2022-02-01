'use strict';
const BaseController = require('./base');
class ArticleController extends BaseController {
  async index() {
    const { ctx, app } = this;
    try{
      const ret = await ctx.model.Article.findAll({ 
        raw:true
      });
      console.log('ret',ret);
      if(ret.length){
        this.success({list:ret});
      }else{
        this.error('获取文章列表失败')
      }
    }catch(e){
      console.log(e);
      this.error('获取文章列表失败')
    }
  }
  async add() {
    const { ctx, app } = this;
    const {articleId,pid, title, introduction, content} = ctx.request.body;
    console.log(ctx.request.body);
    try{
      const ret = await ctx.model.Article.create({
        pid,title,introduction,content
      })
      if(ret){
        if(articleId!=-1){
          const del = await ctx.model.Articlecatche.destroy(
            {
              where: {
                id: articleId
              }
            }
          )
          if(del){
            this.success({},'添加文章成功')
          }else{
            this.success({},'添加文章成功,但是缓存清除失败')
          }
        }else{
          this.success({},'添加文章成功')
        }
        
      }else{
        this.error('添加文章失败');
      }
    }catch(e){
      console.log(e);
      this.error('添加文章失败');
    }
  }
  async getCache(){
    const { ctx, app } = this;
    try{
      const ret = await ctx.model.Articlecatche.findAll({raw:true});
      // console.log('ret:',ret);
      if(ret.length){
        this.success(ret[0],'获取缓存成功')
      }else{
        this.success({id:-1},'暂无缓存')
      }
    }catch(err){
      // console.log(err);
      this.error('获取缓存失败')
    }
  }
  async addCache(){
    const { ctx, app } = this;
    const { id,pid, title, introduction, content } = ctx.request.body;
    // console.log(ctx.request.body);
    const createCatche =async ()=>{
      const ret = await ctx.model.Articlecatche.create({
        pid,
        title,
        introduction,
        content,
      })
      if(ret){
        this.success({},'缓存成功')
      }
    }
    try{
      if(id==-1){
        await createCatche()
      }else{
        const ret = await ctx.model.Articlecatche.findByPk(id);
        if(ret){
          const ret = await ctx.model.Articlecatche.update(
            {pid,title,introduction,content,},
            {
              where: {
                id
              }
            }
          )
          if(ret){
            this.success({},'缓存成功')
          }else{
            this.success({},'缓存失败')
          }
        }else{
          await createCatche()
        }
      }
    }catch(e){
      console.log(e);
      this.error('缓存失败')
    }
  }
  async delCache(){
    this.success({ });
  }
}

module.exports = ArticleController;
