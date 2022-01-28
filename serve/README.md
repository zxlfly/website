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
### npx sequelize db:migrate:undo
### 可以通过 `db:migrate:undo:all` 回退到初始状态
### npx sequelize db:migrate:undo:all

考虑后期单独独立一个docs站出来，方便查询个人记录docs。
access