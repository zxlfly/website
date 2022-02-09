'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT, DataTypes } = app.Sequelize;

  const Baseinfo = app.model.define('baseinfo', {
    id: { type: INTEGER, primaryKey: true, allowNull: false },
    juejin: STRING,
    github: STRING,
    weixin: STRING,
    zhihu: STRING,
    qq: STRING,
    des: STRING,
    bilibili: STRING,
    email:STRING,
    des:STRING,
    avatar:STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Baseinfo;
};
