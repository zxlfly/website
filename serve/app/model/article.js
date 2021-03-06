'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT,DataTypes } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pid: { type: INTEGER, allowNull: false, },
    title: { type: TEXT, allowNull: false },
    introduction: { type: TEXT, allowNull: false, },
    content: { type: DataTypes.TEXT('long'), allowNull: false },
    sort: { type: INTEGER, allowNull: false, defaultValue: 100 },
    created_at: DATE,
    updated_at: DATE,
  });

  return Article;
};
