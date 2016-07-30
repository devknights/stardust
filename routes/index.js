'use strict';

module.exports = function (app, rootPath) {

  var _instagram = require(rootPath + '/components/instagram');

  app.get('/', _instagram.showHomePage);

  app.get('/authorize-user', _instagram.authorizeUser);

  app.get('/authorization-code', _instagram.getAccessToken);
};