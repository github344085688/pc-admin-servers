/**
 * Created by f on 2019/5/29.
 */
const svgCaptcha = require('svg-captcha');
module.exports = app => {
    router.post('/captcha', async (ctx, next)=>{
        var captcha = svgCaptcha.create({
            size:4,    //验证码长度
            fontSize:40,   //字体大小
            width:100,
            height:50,
            background:'#e3ebe9'
        });
        ctx.session.captcha = captcha.text;
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    });

};
