const db = require('../config/db')
const table = 'board';

class Board {

    createBoard =(boardsContent, callback)=>{
        //console.log(member)

        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,boardsContent,callback)
    }
    getBoardByNo =( callback)=>{
        var sql = `SELECT * FROM ${table} `
        db.query(sql,callback)
    }
}
module.exports = Board