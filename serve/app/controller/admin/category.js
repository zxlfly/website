'use strict';
const BaseController = require('../base');
const sequelize = require('sequelize')
class CategoryController extends BaseController {
  async index() {
    const { ctx, app } = this;
    try{
      const list = await ctx.service.tools.getTreeData({id:'pid',val:0},ctx.model.Category)
      // console.log('list',list);
      this.success({ list});
    }catch(e){
      console.log(e);
      this.error('出错了');
    }
  }
  async add() {
    const { ctx, app } = this;
    const data = ctx.request.body
    if(!data.name??false){
      this.error('请输入合法名称');
      return
    }
    let des = '默认描述'
    if(data.des!=null&&data.des!=''){
      des=data.des
    }
    let pid = 0
    if(data.id!=null){
      pid = data.id
    }
    try{
      const ret = await ctx.model.Category.findOne({ 
        where: { 
          name:data.name,
          pid
        } 
      });
      if (ret) {
        return this.error('分类已存在');
      }
      const addres = await ctx.model.Category.create({ 
        name:data.name,
        pid,
        des
      });
      if(addres){
        return this.success({},'添加成功');
      }
      this.error('添加失败');
    }catch(err){
      console.log(err);
      this.error('操作失败');
    }
  }
  async edit(){
    const { ctx, app } = this;
    const data = ctx.request.body
    if(!data.name??false){
      this.error('请输入合法名称');
      return
    }
    let des = '默认描述'
    if(data.des!=null&&data.des!=''){
      des=data.des
    }
    try{
      const ret = await ctx.model.Category.findByPk(data.id);
      if (!ret) {
        return this.error('分类id错误');
      }
      const addres = await ctx.model.Category.update(
        {name:data.name,des},
        {
          where: {
            id: data.id
          }
        }
      );
      if(addres){
        return this.success({},'更新成功');
      }
      this.error('更新失败');
    }catch(err){
      console.log(err);
      this.error('操作失败');
    }
  }
  async del(){
    const { ctx, app } = this;
    const data = ctx.request.body
    if(!data.id??false){
      this.error('id不合法');
      return
    }
    try{
      
      let list = await ctx.service.tools.getTreeId(data.id,ctx.model.Category)
      console.log('list',list);
      if(list){
        let pros = []
        list.forEach(async x=>{
          pros.push(ctx.model.Category.destroy(
            {
              where: {
                id: x
              }
            }
          ))
        })
        let res =await Promise.all(pros.map((promise) => promise.catch((e) => {
          console.log("错误信息" + e)
        })))
        let err = 0
        res.forEach((x,i)=>{
          if(x==undefined){
            err +=1
          }
        })
        if(err>0){
          this.error(`${err}个操作失败`,-2)
        }else{
          this.success()
        }
      }else{
        this.error('操作失败')
      }
    }catch(err){
      console.log(err);
      this.error('操作失败');
    }
  }
}

module.exports = CategoryController;
