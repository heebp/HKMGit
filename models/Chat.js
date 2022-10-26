const db = require('../config/db')
const table = 'chat';

class Chat{
    selectChatting = (board_no, callback) =>{
        var sql = `select * from ${table} where board_board_no = ${board_no}` 
        db.query(sql,callback)
    }

    createChatting = (chatContent, callback) =>{
        var sql = `insert into ${table} values(NULL, "${chatContent.date}", "${chatContent.member_id}", ${chatContent.board_no})` 
        db.query(sql,callback)
    }

    countRooms = (countContent, callback) =>{
        var sql = `select count(*) from ${table} where member_id = "${countContent.member_id}" and board_board_no = "${countContent.board_no}";`
        db.query(sql,callback)
    }
    getRooms = (member_id, callback) =>{
        var sql = `select * from chat join board on board_board_no = board_no where chat.member_id = "${member_id}" or board.member_id = "${member_id}";`
        db.query(sql,callback)
    }
    getChattingInfo = (chat_no,callback) =>{
        var sql = `select board.member_id as seller, chat.member_id as buyer from chat join board on board_board_no = board_no where chat_no = ${chat_no};`
        +`select chat_no,chat_id,message,chat.date,member_id,board_board_no from message join chat on chat_chat_no = chat_no where chat_no =${chat_no};`;
        db.query(sql,callback)
    }


}
module.exports = Chat