const db = require('../config/db')
const table = 'mystore';

class Mystore {

    changeMystore =(mystoreContent, callback)=>{
        var sql = `UPDATE ${table} SET ? where member_id = "${mystoreContent.member_id}"`
        db.query(sql,mystoreContent,callback)
    }
    getMystoreById =(member_id, callback)=>{
        var sql = `SELECT * FROM ${table} join board where mystore.member_id = "${member_id}" and board.member_id = "${member_id}" order by date desc;`
        db.query(sql,callback)
    }

}
module.exports = Mystore