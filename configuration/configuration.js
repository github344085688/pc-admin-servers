'use strict';
module.exports = app => {
    app.mongoConfig = {
        MONGO_URL: 'localhost:27017',
        MONGO_DBNAME: '/test',
        SET_ACTIVITIES: 'SET_ACTIVITIES',
        SET_SUPER_SALE: 'SET_SUPER_SALE',
        SET_SHOPS: 'SET_SHOPS',
        SET_SEARCH_VAL: 'SET_SEARCH_VAL',
    }
    app.jwtConfig = {
        secretOrPrivateKey: 'I am a goog man!',
        expiresIn: 60 * 60 * 24
    }
}