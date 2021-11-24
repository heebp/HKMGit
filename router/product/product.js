const mysql = require('mysql');
const express = require('express')
var app = express()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    port: 3306,
    database: 'store'
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/topic', function(req, res) {
    var sql = 'SELECT * FROM topic';
    connection.query(sql, function(err, topics, fields) {

        var sql = 'SELECT * FROM topic';
        conn.query(sql, function(err, topic, fields) { //[id] : 사용자로부터 받은 id
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('view', { topics: topics, topic: topic[0] });
            }
        });

    });
});

app.listen(3000, function() {
    console.log("Connected localhost:3000");
});