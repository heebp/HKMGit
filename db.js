const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    port: 3306,
    database: 'store'
});