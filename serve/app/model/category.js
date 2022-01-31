'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,TEXT} = app.Sequelize;

  const Category = app.model.define('category', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pid: { type: INTEGER, allowNull: false, defaultValue: 0 },
    name: { type: STRING(30), allowNull: false },
    des: { type: TEXT, allowNull: false, defaultValue: '没有描述- -' },
    sort: { type: INTEGER, allowNull: false, defaultValue: 100 },
    created_at: DATE,
    updated_at: DATE,
  });

  return Category;
};
