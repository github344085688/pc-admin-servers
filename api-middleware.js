const cluster = require('cluster');
const moment = require('moment');
let app = require('./app/app.js');
const port = process.env.PORT || app.conf.get('server.port'),
    alphabet = "abcdefghijklmnopqrstuvwxyz".split(""),
    processNumber =app.conf.get('system.nodeProcessNumber');
if (cluster.isMaster && processNumber > 1) {
    for (let i = 0; i < processNumber; i++) {
        cluster.fork({workerId: alphabet[i]});
    }
    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
    cluster.on('exit', worker => {
        let now = moment().format("YYYY-MM-DD H:m:s");
        app.logger.info(now.toString() + ' - [worker] ' + worker.process.pid + ' exit.');
    });
} else {
    let server = app.listen(port,()=>{
        console.log('starting at port '+ port);
    });
    server.setTimeout(600 * 1000);
}

