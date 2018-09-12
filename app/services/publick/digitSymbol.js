/**
 * Created by f on 2018/8/16.
 */
let service = (app, ctx) => {
    async function digitSymbols(objects, symbol) {
        if (symbol === '/') {
            objects = objects.replace("\\\\", "\/\/");
            objects = objects.replace("\\", "\/");
            objects = objects.replace("\\", "\/");
        }
        return objects;
    }

    return {
        digitSymbols
    }
}
module.exports = app => {
    return ctx => service(app, ctx)
}
