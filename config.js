var path = require('path');
var fs = require('fs');

// var location = fs.readFileSync('/etc/env', 'utf-8');
// location = location.replace(/[\r\n]/g, "");
var location = 'dev';

var corsMap = {
  'dev': 'https://test-vip.aqumon.com',
  'live': 'https://smarthk.aqumon.com'
}
var serverPort = process.env.SERVER_PORT || '8070';
var corsOrigin = process.env.SERVER_CORS || corsMap[location];
var logsDir = process.env.SERVER_LOGS || path.resolve(__dirname, 'logs');
var appId = 'wx4b46d1bc97c5012b';
var appSecret = 'ef49f04292a77cd67f7d472173019b5c';

var config = {
    serverPort: serverPort,
    environment: 'test environment',
    corsOrigin: corsOrigin,
    logsDir: logsDir,
    appId: appId,
    appSecret: appSecret
};

module.exports = config;
