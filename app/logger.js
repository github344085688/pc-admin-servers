'use strict';
const os = require('os'),
    path = require('path'),
    moment = require('moment'),
    winston = require('winston');
module.exports = (app)=> {
    let transports = [];

    const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
        return `${moment().format()} [${label}] ${level}: ${message}`;
    });

    let workerIdSuffix = process.env.workerId ? ("." + process.env.workerId) : "";
    transports.push(new (winston.transports.File)({
        filename: path.join(app.conf.get('log.path'), 'error.log' + workerIdSuffix),
        json: false,
        level: 'error',
        prettyPrint: _jsonPrettyPrint
    }));
    transports.push(new (winston.transports.File)({
        filename: path.join(app.conf.get('log.path'), 'info.log' + workerIdSuffix),
        json: false,
        level: 'info',
        prettyPrint: _jsonPrettyPrint
    }));

    app.logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.label({ label: 'right meow!' }),
            winston.format.timestamp(),
            myFormat
        ),
        transports: transports,
        exceptionHandlers: [

        ]
    });

    let accessLogger = winston.createLogger({
        transports: [new (winston.transports.File)({
            filename: path.join(app.conf.get('log.path'), 'error.log'),
            json: false,
            level: 'error',
            formatter: (options) => options.message
        })],

    });

    app.accessLogger = {
        log: function () {
            this.request._endTime = this.request._endTime || new Date;

            let request = this.request,
                response = this.response,
                elapsed = request._endTime - request._startTime,
                startTime = moment(request._startTime).format('DD/MMM/YYYY HH:mm:ss ZZ'),
                instanceId = process.env.workerId ? `instance.${process.env.workerId}` : '';

            accessLogger.info(`"${request.ip}" [${startTime}] "${request.method} ${request.url}" "${request.header['user-agent']}" ${response.status} ${elapsed}ms "${instanceId}"`);
        }
    };


};

function _jsonPrettyPrint(obj) {
    return JSON.stringify(obj);
}