const jwt = require('jsonwebtoken');
let service = (app, ctx) => {
    async function token(Porems) {
        try{
            return await jwt.sign(Porems, jwtConfig.secretOrPrivateKey, {
                expiresIn: jwtConfig.expiresIn
            });
        }catch(error) {
            return error
        }

    }
    return {
        token,
    }
}

module.exports = app => {
    return ctx => service(app, ctx);
};