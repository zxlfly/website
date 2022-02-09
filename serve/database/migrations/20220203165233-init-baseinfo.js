'use strict';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 baseinfo 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING ,TEXT} = Sequelize;
    await queryInterface.createTable('baseinfo', {
      id: { type: INTEGER, primaryKey: true,allowNull: false },
      juejin:STRING,
      github:STRING,
      weixin:STRING,
      zhihu:STRING,
      bilibili:STRING,
      qq:STRING,
      des:TEXT,
      email:STRING,
      avatar:STRING,
      created_at: DATE,
      updated_at: DATE,
    });
    queryInterface.bulkInsert('baseinfo', [{
      id:1,
    }]);
  },
  // 在执行数据库降级时调用的函数，删除 baseinfo 表
  down: async queryInterface => {
    await queryInterface.dropTable('baseinfo');
  },
};
