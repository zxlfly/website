'use strict';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 baseinfo 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING ,DataTypes} = Sequelize;
    await queryInterface.createTable('baseinfo', {
      id: { type: INTEGER, primaryKey: true,allowNull: false },
      juejin:STRING,
      github:STRING,
      weixin:STRING,
      zhihu:STRING,
      qq:STRING,
      des:STRING,
      bilibili:STRING,
      logo_white:STRING,
      logo_black:STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 baseinfo 表
  down: async queryInterface => {
    await queryInterface.dropTable('baseinfo');
  },
};
