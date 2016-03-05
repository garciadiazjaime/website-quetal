'use strict';

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

var client = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode, { code: 300 });

module.exports = client;