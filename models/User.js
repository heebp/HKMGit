const db = require('../config/db')
const table = 'hkm_db.member';

class User {
    getUserById = ( id, callback) => {
        var sql = `SELECT * FROM ${table} WHERE id = "${id}"`
        db.query(sql, id, callback)
    }
    createUser =(memberInfo, callback)=>{
        var sql = `INSERT INTO ${table} VALUES ('${memberInfo.id}','${memberInfo.student_id}','${memberInfo.passwd}','2022-02-02 11:11:11','${memberInfo.nickname}','${memberInfo.email}')`
        db.query(sql,memberInfo,callback)
        var sql = `INSERT INTO mystore(store_name,store_description,store_image,member_id) VALUES('상점 이름','상점 설명','상점 사진',"${memberInfo.id}")`
        db.query(sql,memberInfo)
    }
}
module.exports = User