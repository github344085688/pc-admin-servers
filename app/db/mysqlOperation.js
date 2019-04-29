/**
 * Created by f on 2019/1/4.
 */
// const mysql = require('mysql');
// let service = (app, ctx) => {
//     async function find(callback) {
//         return new Promise(async (resolve, reject)=>{
//             let connection;
//             connection = await mysql.createConnection(mysqlConfig);
//             connection.connect(function (err) {
//                 if (err) {
//                     reject(err)
//                 }
//
//             });
//            let nulls= await connection.count('SELECT * FROM usert');
//             await connection.query('SELECT * FROM usert', function (error, results, fields) {
//                 if (error) throw error;
//                 resolve(results);
//                 // connected!
//             });
//         })
//
//     }
//
//     return {
//         find,
//
//     }
//
// }
//
// module.exports = app => {
//     return ctx => service(app, ctx);
// }


/**
 * Created by f on 2019/1/4.
 */
let util = require('../commons/util');
const mysql = require('promise-mysql');
let service = (app, ctx) => {
    async function execSql(sql, dataBase) {
        try {
            let config = mysqlConfig;
            config.database = dataBase;
            let pool = mysql.createPool(config);
            return await pool.query(sql);
        } catch (e) {
            return e
        }
    }

    async function selectTitleName(operationdb) {
        try {
            let countsql = `SHOW COLUMNS FROM  ${operationdb.tableName}`;
            return await execSql(countsql, operationdb.dataBase);
        } catch (e) {
            return "err"
        }
    }

    async function insertDbs(porems, operationdb) {
        try {
            let filterTitleName = _.pull(_.map(await selectTitleName(operationdb), 'Field'), 'id');
            let insertData;
            if (porems.constructor == Array) {
                let batchArray = [];
                _.forEach(porems, (detail) => {
                    _.forEach(filterTitleName, (item) => {
                        if (!detail[item]) {
                            detail[item] = '';
                        }
                    });
                    batchArray.push(util.insertSQLToString(_.pick(detail, filterTitleName)));
                });
                insertData = _.toString(batchArray);
            }
            if (porems.constructor == Object) {
                _.forEach(filterTitleName, (item) => {
                    if (!porems[item]) {
                        porems[item] = '';
                    }
                })
                insertData = util.insertSQLToString(_.pick(porems, filterTitleName))
            }
            let sql = `INSERT INTO ${operationdb.tableName} ( ${filterTitleName}) VALUES ${insertData}`;
            return await execSql(sql, operationdb.dataBase)
        } catch (e) {
            return e
        }
    }

    async function updateDbs(porems, operationdb) {
        try {
            let filterTitleName = _.pull(_.map(await selectTitleName(operationdb), 'Field'), 'id');
            let updatastr;
            let ids;
            if (porems.constructor == Array) {
                updatastr = util.updateSQLToString(filterTitleName, porems);
                ids = _.toString(_.map(porems, 'id'));
            }
            if (porems.constructor == Object) {
                updatastr = util.updateSQLToString(filterTitleName, [porems]);
                ids = porems.id;
            }
            let sql = `UPDATE ${operationdb.tableName} SET ${updatastr} WHERE id IN(${ids})`;
            return await execSql(sql, operationdb.dataBase)
        } catch (e) {
            return e
        }
    }

    async function deleteDb(id, operationdb) {
        try {
            let sql = `DELETE FROM ${operationdb.tableName} WHERE id=${id}`;
            return await execSql(sql, operationdb.dataBase)
        } catch (e) {
            return e
        }
    }

    async function selectByPagingDb(porems, operationdb, selectkey ) {
        try {
            let filterTitleName = _.pull(_.map(await selectTitleName(operationdb), 'Field'), 'id');
            let searchCriteriaByKey = _.toString(_.keys(_.pick(porems, filterTitleName)));
            let totalcounts = await selectTotalcountByDb({key: selectkey, dataBase: operationdb.dataBase, tableName: operationdb.tableName});
            let pageNo = porems.paging && porems.paging.pageNo ? porems.paging.pageNo : 1;
            let startIndex = (pageNo-1 )* (porems.paging && porems.paging.limit ? porems.paging.limit : 1);
            let totalPage = totalcounts[0].totalcount / (porems.paging && porems.paging.limit ? porems.paging.limit : 10);
            let endIndex = startIndex + (porems.paging && porems.paging.limit ? porems.paging.limit : 10);
            let paging = {
                endIndex: endIndex,
                limit: porems.paging && porems.paging.limit ? porems.paging.limit : 10,
                startIndex: startIndex,
                pageNo: pageNo,
                totalcount:totalcounts[0].totalcount,
                totalPage:Math.ceil(totalPage)　
            }
            // SELECT id,col01 FROM pagetest order by id desc limit 10,5
            let sql = `SELECT ${searchCriteriaByKey} FROM ${operationdb.tableName} LIMIT ${paging.startIndex},${paging.endIndex}`;
            return {
                data:await execSql(sql, operationdb.dataBase),
                paging:paging
            }
        } catch (e) {
            return e
        }
    }

    async function selectTotalcountByDb(operationdb) {
        try {
            let sql = `SELECT COUNT(${operationdb.key}) as totalcount  FROM ${operationdb.tableName}`;
            return await execSql(sql, operationdb.dataBase)
        } catch (e) {
            return e
        }
    }

    return {
        insertDbs,
        updateDbs,
        deleteDb,
        selectByPagingDb,
        selectTotalcountByDb,
        execSql
    }

}

module.exports = app => {
    return ctx => service(app, ctx);
}
