require('babel-polyfill');
const chai = require('chai');
const chaiImmutable = require('chai-immutable');
/*const axios = require('axios');
axios.defaults.adatper = require('http');*/
chai.use(chaiImmutable);

global.window = {
  infinet: {}
};
global.NODE_ENV = 'development';
require('babel-register')({
  ignore: /[\\\/]node_modules(?![\\\/]@igor)/
});