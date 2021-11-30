const db = require('../config/db')
const table = 'mystore';

class Mystore {

    changeMystore =(mystoreContent, callback)=>{
        //console.log(member)

        var sql = `UPDATE ${table} SET ? where member_id = "${mystoreContent.member_id}"`
        db.query(sql,mystoreContent,callback)
    }
}
module.exports = Mystore