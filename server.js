var config = require('./config');
var app = require('./app');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

console.log('numCPU:' + numCPUs);

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    app.set('port', config.serverPort);
    app.listen(app.get('port'), function() {
        console.log('server is listening on ' + app.get('port'));
    });
}
