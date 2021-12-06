const db = require('../config/db')
const table = 'favorite';

class Favorite{

    createFavorite =(favoriteContent, callback)=>{
        //console.log(member)

        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,favoriteContent,callback)
    }
    getFavoriteById=(member_id,callback)=>{
        //select board_no,title,image,price from board join favorite on board_no = board_board_no where board_no=8; test
       var sql =` select board.member_id,board_no,title,content,image,price from board join favorite on board_no = board_board_no where favorite.member_id = "${member_id}"`
       db.query(sql,member_id,callback)
    }
    deleteFavoriteByBoardNo=(favoriteContent,callback)=>{
   
    var sql = `delete favorite from board join favorite on board_no = board_board_no where favorite.member_id = "${favoriteContent.member_id}" and board_board_no="${favoriteContent.board_no}";`
    //` select board.member_id,board_no,title,content,image,price from board join favorite on board_no = board_board_no where favorite.member_id = "${member_id}"`
    db.query(sql,callback)
    }
}

module.exports = Favorite