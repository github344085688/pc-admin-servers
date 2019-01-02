const Koa = require('koa');
const app = new Koa();
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
require('./routes')(app);
require('./services')(app);
require('../configuration/configuration')(app);
module.exports=app;
