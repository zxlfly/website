'use strict';
const md5 = require('md5');
const {v1} = require('uuid');
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING ,DataTypes} = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: DataTypes.UUID, primaryKey: true,allowNull: false },
      name: STRING(30),
      pwd:STRING,
      is_super:INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    
    queryInterface.bulkInsert('users', [{
      id:v1(),
      name: 'zxlfly',
      pwd: md5(md5('123456')+'uZserlogXinHashSaLlt'),
      is_super:1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
