/**
 * Created by f on 2018/8/23.
 */
const monk = require('monk')
let service = (app, ctx) => {
    const collections = mongoConfig.MONGO_DBNAME;

    /**
     *
     * @param dbName
     * @param operation
     * @param filter
     * @returns {Promise.<*>}
     */

    async function find(porems, operation = null, filter = null) {
        try {
            let path = porems.tableName ? mongoConfig.MONGO_URL + porems.tableName : mongoConfig.MONGO_URL;
            const db = monk(path);
            const counters = db.get(porems.dataBase);
            let returnData;
            if (!filter) returnData = await counters.find(operation);
            if (filter) returnData = await counters.find(operation, filter);
            db.close();
            return returnData
        }
        catch (error) {
            return error;
        }
    }

    /**
     *
     * @param porems
     * @returns {Promise.<*>}
     */
    async function insert(porems) {
        try {
            let path = porems.tableName ? mongoConfig.MONGO_URL + porems.tableName : mongoConfig.MONGO_URL;
            let db = monk(path);
            let returnData;
            const counters = await db.get(porems.dataBase);
            await counters.insert(porems.insertData);
            if (porems.createIndex) await counters.createIndex(porems.createIndex);
            await  counters.indexes().then((indexes) => {
                // console.log(indexes);
            })
            returnData = await counters.find();
            db.close();
            return returnData;
        }
        catch (error) {
            return error;
        }
    }

    /**
     *
     * @param dbName
     * @param operation
     * @returns {Promise.<*>}
     */
    async function remove(dbName, operation) {
        try {
            const db = monk(mongoConfig.MONGO_URL + collections);
            let returnData;
            const counters = db.get(dbName);
            returnData = await counters.remove(operation);
            db.close();
            return returnData;
        }
        catch (error) {

        }
    }

    /**
     *
     * @param dbName
     * @param oldOperation
     * @param newOperation
     * @returns {Promise.<*>}
     */
    async function update(porems, oldOperation = null, newOperation = null) {
        try {
            let path = porems.tableName ? mongoConfig.MONGO_URL + porems.tableName : mongoConfig.MONGO_URL;
            let db = monk(path);
            let returnData;
            const counters = db.get(porems.dataBase);
            returnData = await counters.update(porems.oldOperation, porems.newOperation);
            db.close();
            return returnData;
        }
        catch (error) {
            return error

        }
    }

    /*
     async function createDatabase(porems) {
     try {
     let poremsPath = porems.parents ? porems.parents : '';
     const db = monk(mongoConfig.MONGO_URL + '/aatest');
     //let returnData = await db.create('userssd', { capped: true, size: n })
     const counters = await db.get('ppuserssd');
     // let returnData = await counters.insert(porems.insertData)
     db.close();
     return returnData;
     }
     catch (error) {
     return error

     }
     }*/


    return {
        insert,
        remove,
        update,
        find,

    }

}

module.exports = app => {
    return ctx => service(app, ctx);
}
