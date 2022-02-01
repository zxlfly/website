'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DataTypes,TEXT } = Sequelize;
    await queryInterface.createTable('articlecache', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      pid:{type:INTEGER,allowNull:true,defaultValue:-1},
      title: {type:TEXT,allowNull:false},
      introduction:{type:TEXT,allowNull:false,},
      content:{type:DataTypes.TEXT('long'),allowNull:false},
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('articlecache');
  },
};
