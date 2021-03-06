/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642609690049_8583';
  config.HashSalt = 'uZserlogXinHashSaLlt';
  // add your middleware config here
  config.middleware = ['errorHandler'];
  config.uploadDir = 'app/public/admin/upload';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.multipart = {
    mode: 'file',
    // whitelist: () => true,
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',//用户名
    password: '********',//用户密码
    database: 'blog',//数据库名
    define: {
      underscored: true,
      freezeTableName: true,
    },
    dialectOptions:{
      dataStrings:true,
      typeCast:true
    },
    timestamps: false,
    paranoid:false
  };
  return {
    ...config,
    ...userConfig,
    jwt: {
      secret: '@webblog:website:zxl',
    },
  };
};
