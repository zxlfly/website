'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT,DataTypes } = app.Sequelize;

  const ArticleCatche = app.model.define('articlecache', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pid: { type: INTEGER, allowNull: false, },
    title: { type: TEXT, allowNull: false },
    introduction: { type: TEXT, allowNull: false, },
    content: { type: DataTypes.TEXT('long'), allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });

  return ArticleCatche;
};
