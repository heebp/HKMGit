const db = require('../config/db')
const table = 'board';

class Board {

    createBoard =(boardsContent, callback)=>{
        //console.log(member)

        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,boardsContent,callback)
    }
    getBoard =( callback)=>{
        var sql = `SELECT * FROM ${table} `
        db.query(sql,callback)
    }
    getBoardBySearch =( query,callback)=>{
        var sql = `SELECT title,content FROM ${table} WHERE title LIKE ?`
        db.query(sql,'%'+query+'%',callback)
    }
    getBoardById =(mystoreContent, callback)=>{
        var sql = `SELECT * FROM ${table} where member_id = "${mystoreContent.member_id}"`
        db.query(sql,callback)
    }
    getBoardByNo =(board_no, callback)=>{
        var sql = `SELECT * FROM ${table} where board_no = "${board_no}";`

        db.query(sql,callback)
    }
}
module.exports = Board