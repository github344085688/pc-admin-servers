let service = (app, ctx) => {
    async function fillItemName(objects) {
        objects.lo = "司法所贷款啥电话费"
    }
    return {
        fillItemName,
    }
}

module.exports = app => {
    return ctx => service(app, ctx);
};