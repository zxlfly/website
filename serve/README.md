# 结构
## default
前台接口
## admin
中台接口
## 数据库
- user
  - 目前只有我一个人
  - 后期加入注册，第三方登录
    - 实现评论功能
- 将logo，个人相关信息保存到，一张单独的表
- 分类
  - 基础
    - 顶级分类->二级分类->详情
  - 详情单独一张表
  - 各个等级分类同一张表，使用字段区分
    - 顶级为0
    - 次级为上一级的id
### sequelize-cli
建表：``npx sequelize migration:generate --name=init-users``
### 升级数据库
``npx sequelize db:migrate``
### 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
``npx sequelize db:migrate:undo``
### 可以通过 `db:migrate:undo:all` 回退到初始状态
``npx sequelize db:migrate:undo:all``

### 关于api文档这里没有实现可以使用第三方插件
``egg-swagger-doc-feat``
### 关于校验
可以使用``Validate``，这里没有安装使用
### 文档和验证可以结合一下
``app``文件夹下创建``contract``文件夹
```
// 以常见user登录的接口为例，不是本项目中的
// 目录下创建 user.js
module.exports = {
    createUserRequest: {
        mobile: { type: 'string', required: true, description: '手机号', example: '18801731528', format: /^1[34578]\d{9}$/, },
        password: { type: 'string', required: true, description: '密码', example: '111111', },
        code: { type: 'string', required: true, description: '验证码', example: 'zx45' },
    },
    baseResponse: { 
      code: { type: 'integer', required: true, example: 200 }, 
      data:{type: 'string',example: '请求成功' }, 
      message: { type: 'string', example: '请求成功' }, },
    }
// controller目录下创建user.js 下面为对应接口代码
/**
   * @summary 用户登录
   * @description 用户登录，传入用户手机号/密码/验证码
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
    // 组装参数
    // 调用 Service 进行业务处理
    // 设置响应内容和响应状态码
  }
```
### 关于统一的错误处理``middleware``
``admin``中的``try...catch``可以去掉
### 统一应答处理
这里使用的``base.js``然后继承它，可以使用``helper``方法实现统一响应格式

### 关于初始化数据
这里是在``migrations``中对应的数据库文件中完成的，可以考虑在``egg``生命周期中完成  
#### egg生命周期
在``config``文件夹下创建``app.js``  
[文档](https://eggjs.org/zh-cn/advanced/loaderUpdate.html?#ready-%E5%87%BD%E6%95%B0%E6%9B%BF%E4%BB%A3)
