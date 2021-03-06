const fs = require('fs')
const multer = require('koa-multer');
const path = require('path');
module.exports = app => {
    let storage = multer.diskStorage({
        destination: path.resolve('publick', 'upload', 'images'),
        filename: (ctx, file, cb) => {
            cb(null, file.originalname);
        }
    });
    let fileFilter = (ctx, file, cb) => {
        if (file.originalname.split('.').splice(-1) == 'txt') {
            cb(null, false);
        } else {
            cb(null, true);
        }
    }
    let upload = multer({storage: storage, fileFilter: fileFilter});
    router.post('/user/uploadfile', upload.single('file'), async ctx => {
        if (ctx.req.file) {
            let savePath = path.join('/images', ctx.req.file.filename);
            savePath = await digitSymbol(this).digitSymbols(savePath, '/');
            ctx.body = 'http://' + ctx.request.header.host + savePath;
        } else {
            ctx.body = 'upload error';
        }
    });
}

