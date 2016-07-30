'use strict';

var _express = require('express');
var _app = _express();
var _rootPath = __dirname;

_app.set('view engine', 'jade');

require('./routes')(_app, _rootPath);

_app.listen(process.env.PORT || 3000, function () {
  console.log('Example app running!');
});