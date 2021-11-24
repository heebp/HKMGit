const express = require('express')
var router = express.Router()
const db = require('mysql');

router.get('/signin', (req, res) => {
    res.render('signin')
})

const process = {
    signin: (req, res) => [
        console.log(req.body)
    ]
}
module.exports = {
    router,
    process
}