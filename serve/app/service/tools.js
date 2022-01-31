'use strict';
// const svgCaptcha = require('svg-captcha');
const md5 = require('md5');
const path = require('path');
const Service = require('egg').Service;
class ToolsService extends Service {
  // async captcha() {
  //   const captcha = svgCaptcha.create({
  //     size: 4,
  //     fontSize: 50,
  //     width: 100,
  //     height: 40,
  //   });
  //   this.ctx.session.code = captcha.text;
  //   return captcha;
  // }
  async md5(str) {
    return md5(str);
  }
  async getTime() {
    const d = new Date();
    return d.getTime();
  }
  async getTreeData(root,model) {
    async function getRoot() {
      let roots = await model.findAll({
        where: {
          [root.id]: root.val
        },
        raw: true
      })
      roots = await getChild(roots);
      return roots;
    }
    async function getChild(roots) {
      let expendPromise = [];
      roots.forEach(item => {
        expendPromise.push(model.findAll({
          where: {
            pid: item.id
          },
          raw: true
        }))
      })
      let child = await Promise.all(expendPromise);
      for (let [idx, item] of child.entries()) {
        if (item.length > 0) {
          item = await getChild(item);
        }
        roots[idx].child = item;
      }
      return roots;
    }
    let res = await getRoot()
    // console.log('res',res);
    return res
  }
  async getTreeId(id,model) {
    // 先判断当前id是否存
    let arr = []
    let str = '10'
    let roots = await model.findAll({
      where: {
        id: id
      },
      raw: true
    })
    if(roots){
      arr = [id]
      await getChildren(roots)
      return arr
    }else{
      return null
    }
    // 递归查询关联的子项 
    // 由于子项不一定唯一，所以传数组进去，方便遍历操作
    async function getChildren(roots) {
      let expendPromise = [];
      roots.forEach(item => {
        expendPromise.push(model.findAll({
          where: {
            pid: item.id
          },
          raw: true
        }))
      })
      let child = await Promise.all(expendPromise);
      for (let item of child) {
        if (item.length > 0) {
          // 多个的时候
          item.forEach(x=>{
            arr.unshift(x.id)
          })
          item = await getChildren(item);
        }
      }
    }
  }
}

module.exports = ToolsService;
