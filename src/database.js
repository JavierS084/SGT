const mysql = require('mysql');
//const mysql = require('mysql2")
const { promisify } = require('util');
const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION _LOST"){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query); //Para poder utilizar promesas y async cuando se hace una consulata



module.exports = pool;
//export default pool;