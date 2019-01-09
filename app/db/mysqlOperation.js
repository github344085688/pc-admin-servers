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

const mysql = require('promise-mysql');
let service = (app, ctx) => {
    async function execSql(sql) {
        let pool = mysql.createPool(mysqlConfig);
        return await pool.query(sql);
    }
    return {
        execSql,
    }

}

module.exports = app => {
    return ctx => service(app, ctx);
}
