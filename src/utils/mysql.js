const mysql = require('mysql2/promise');
const { get } = require('lodash');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

const retrieve = async (id) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `jobs` WHERE `jid` = ? LIMIT 1', [id]);
    return get(rows, '[0]', {});
}

const commit = async (id, url, payload) => {
    return pool.execute('INSERT INTO jobs (jid, url, payload) VALUES (?,?,?)', [id, url, payload])
        .then(results => [results, undefined])
        .error(err => [undefined, err]);
};



module.exports = { retrieve, commit };
