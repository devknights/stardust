'use strict';

var _config = require('./config');
var _request = require('request');
var _token = null;

function _showHomePage (req, res) {

  if (_token)
  {
    res.render(__dirname + '/instagram', {token: _token});
  }
  else
  {
    res.redirect('/authorize-user');
  }
}

function _authorizeUser (req, res) {

  if (_token) res.redirect('/');

  var endpoint = 'https://api.instagram.com/oauth/authorize/?';
  var id = 'client_id=' + _config.CLIENT_ID;
  var redirect = '&redirect_uri=' + _config.REDIRECT_URI;
  var responseType = '&response_type=code';
  
  var url = endpoint + id + redirect + responseType;
  
  res.redirect(url);
}

function _getAccessToken (req, res) {

  console.log('[get] /authorization-code');

  console.log('req:', req.query.code);

  var endpoint = 'https://api.instagram.com/oauth/access_token';

  var params = {
    client_id : _config.CLIENT_ID,
    client_secret : _config.CLIENT_SECRET,
    grant_type : 'authorization_code',
    redirect_uri : _config.REDIRECT_URI,
    code : req.query.code
  };

  _request.post({url:endpoint, form: params}, function (err, responseHTML, body) {
    console.log('\n\nPOST complete...');
    console.log('\nerr:', err);
    console.log('\nresponseHTML:', JSON.stringify(responseHTML));
    console.log('\nbody:', body);

    var result;

    try {
      result = JSON.parse(body);
      _token = result.access_token;
      res.redirect('/');
    }
    catch (err) {
      console.log('Error parsing body:', err);
    }
  });
}

module.exports = {
  showHomePage : _showHomePage,
  authorizeUser : _authorizeUser,
  getAccessToken : _getAccessToken
};