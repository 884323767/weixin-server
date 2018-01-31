var path = require('path');

var serverPort = process.env.WM_SERVER_PORT || '8070';
var corsOrigin = process.env.WM_SERVER_CORS || 'https://test-vip.aqumon.com';
var config = {
    serverPort: serverPort,
    environment: 'production environment',
    corsOrigin: corsOrigin
};

module.exports = config;
