'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING,TEXT } = Sequelize;
    await queryInterface.createTable('category', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      pid:{type:INTEGER,allowNull:false,defaultValue:0},
      name: {type:STRING(30),allowNull:false},
      des:{type:TEXT,allowNull:false,defaultValue:'没有描述- -'},
      sort:{type:INTEGER,allowNull:false,defaultValue:100},
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('category');
  },
};
