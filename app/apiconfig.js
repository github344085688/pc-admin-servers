/**
 * Created by f on 2018/8/31.
 */
const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "I am a goog man!" ;
module.exports = function (app) {
    const apiconfig = async (ctx, next) => {
        if (ctx.request.url == '/logIn' || ctx.request.url == '/signIn') {
           await next();
        }
        else {
            let isVerifyToken = await jwt.verify(ctx.header['x-access-token'], secretOrPrivateKey, async(err, decode)=> {
                if (err) {
                    ctx.body={err:err};
                } else {
                    return true;
                }
            });
            if (isVerifyToken) await next();
        }
    }
    app.use(apiconfig)
};
