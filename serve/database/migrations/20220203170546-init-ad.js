'use strict';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 ad 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING ,DataTypes} = Sequelize;
    await queryInterface.createTable('ad', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      des:STRING,
      img:STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 ad 表
  down: async queryInterface => {
    await queryInterface.dropTable('ad');
  },
};
