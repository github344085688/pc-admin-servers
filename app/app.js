const Koa = require('koa');
const app = new Koa();
require('./commons/globals')(app);
require('./routes')(app);
require('./db')(app);
require('./services')(app);
require('./apiconfig')(app);
require('./conf.js')(app);
require('./logger.js')(app);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});
//
// app.use(async (ctx, next) => {
//     ctx.response.set({
//         'Cache-Control': 'no-store',
//         'Pragma': 'no-cache'
//     });
// });


module.exports=app;
