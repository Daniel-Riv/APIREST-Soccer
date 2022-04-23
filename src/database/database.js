const mysql = require('mysql');
const dbconnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

dbconnection.connect(err => {
    if (err) {
        throw new Error('Error connecting', err);
    } else {
        console.log('database connection');
    }
})

module.exports = dbconnection;

