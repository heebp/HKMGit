const db = require('../config/db')
const table = 'message';

class Message{
  getChatMessage = (chat_no, callback) => {
    var sql = `select chat_no,chat_id,message,chat.date,member_id,board_board_no from ${table} join chat on chat_chat_no = chat_no where chat_no =${chat_no};`;
    db.query(sql,callback)
  }
  createChatMessage = (messageContent, callback) => {
    var sql = `insert into ${table} values(${messageContent.room}, "${messageContent.id}", "${messageContent.message}","${messageContent.date}") `;
    db.query(sql,callback)
  }
}
module.exports = Message