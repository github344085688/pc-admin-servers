let service = (app, ctx) => {
    async function fillItemName(objects) {
        try {
            objects.sss = '水电费发给个人发个'
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fillItemName
    }
};

module.exports = app => {
    return ctx => service(app, ctx);
};