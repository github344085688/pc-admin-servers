
 const forever = require('forever-monitor'),
     config = require('config');

 if (config.get('system.useForever')) {
     let child = new (forever.Monitor)('./api-middleware.js', {
         'silent': true,
         'killTree': true
     });

     let exit = function () {
         child.stop();
     };

     process.on('SIGINT', exit);
     process.on('SIGTERM', exit);
     child.start();

 } else {
     require('./api-middleware.js');
 }