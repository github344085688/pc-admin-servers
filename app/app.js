const Koa = require('koa');
const app = new Koa();
const websockify = require('koa-websocket')
// const ws = require('./ws')
const wsOptions = {}
websockify(app, wsOptions)
require('./commons/globals')(app)
require('./routes')(app)
require('./db')(app)
require('./services')(app)
require('./apiconfig')(app)
require('./conf.js')(app)
require('./logger.js')(app)
require('./session.js')(app)
require('./processesAndThreads')(app)
app.use(router.routes())
app.ws.use(router.routes())
app.use(router.allowedMethods())
app.use(function(ctx, next){
    return next().catch(err => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
})

app.on('error', (err, ctx) => {
    if (err.response && err.response.error) {
        app.logger.error(_extractHttpRespErrorDetail(err.response.error), _newLine(), err.fullStack || err.stack, _newLine("BAM Request Detail:"), _extractRequestDetail(ctx));
    } else {
        app.logger.error(err.fullStack || err.stack || err, _newLine("BAM Request Detail:"), _extractRequestDetail(ctx));
    }

    if (err.remoteError) {
        app.logger.error(`Remote Error Detail`, _extractRemoteErrorDetail(err.remoteError));
    }
})

function _extractHttpRespErrorDetail(error) {
    return _.join([error.message || "", error.text || ""], '\n')
}

function _extractRequestDetail(ctx) {
    if (!ctx || !ctx.request) return "";

    let reqDetail = {};
    reqDetail.requestUrl = ctx.request.url;
    reqDetail.method = ctx.request.method;
    reqDetail.headers = ctx.request.headers;
    reqDetail.body = ctx.request.body;
    return JSON.stringify(reqDetail, null, 2)
}

function _newLine(message) {
    return message ? "\n" + message + '\n' : "\n";
}

function _extractRemoteErrorDetail(remoteError) {
    if (!remoteError) return "";

    return JSON.stringify(remoteError, null, 2)
}

module.exports=app
