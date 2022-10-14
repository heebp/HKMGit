const mysql = require('mysql'); 

const connection = mysql.createConnection({ 
    host:'localhost', 
    user:'root', 
    password:'1234', 
    port:3306, 
    database:'hkm_db',
    multipleStatements: true
});
module.exports = connection
