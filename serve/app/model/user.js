'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true,allowNull: false },
      name: STRING(30),
      pwd:STRING,
      is_super:INTEGER,
      created_at: DATE,
      updated_at: DATE,
  });

  return User;
};
