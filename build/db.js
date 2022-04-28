"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'dbAlmacenSerrano',
    multipleStatements: true
});
mysqlConnection.connect(function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('DB Conectado Correctamente');
    }
});
exports.default = mysqlConnection;
