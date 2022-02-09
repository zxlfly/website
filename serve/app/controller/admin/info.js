'use strict';
const BaseController = require('../base');
const sequelize = require('sequelize')
class InfoController extends BaseController {
  async index() {
    const { ctx, app } = this;
    const res = await ctx.model.Baseinfo.findByPk(1)
    // console.log(res);
    if(res){
      this.success(res)
    }else{
      // 数据库为空 创建
      const ret = await ctx.model.Baseinfo.create({
        id:1
      })
      this.success(ret)
    }
  }
  
  async edit(){
    const { ctx, app } = this;
    const data = ctx.request.body
    let keys = Object.keys(data)
    let arr = [
      'weixin',   'qq',
      'zhihu',    'juejin',
      'bilibili', 'github',
      'des','email','avatar'
    ]
    if(keys.length!==9){
      return this.error('参数数量不合法')
    }
    for(let i =0;i<keys.length;i++){
      if(keys.indexOf(arr[i])==-1){
        return this.error(arr[i]+'参数不存在')
      }
    }
    const res = await ctx.model.Baseinfo.update(
      {...data},
      {
        where: {
          id: 1
        }
      }
    );
    this.success({},'修改成功')
  }
  
}

module.exports = InfoController;
