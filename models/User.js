const db = require('../config/db')
const table = 'member';

class User {
    getUserById = ( id, callback) => {
        //console.log(id)
        var sql = `SELECT * FROM ${table} WHERE id = "${id}"`
        db.query(sql, id, callback)
    }
    createUser =(memberInfo, callback)=>{
        //console.log(member)

        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,memberInfo,callback)
    }
}
module.exports = User