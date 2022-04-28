const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'dbAlmacenSerrano',
    multipleStatements: true

});

mysqlConnection.connect(function (error){
    if(error){
        console.log(error)
    } else {
        console.log('DB Conectado Correctamente')
    }
});

export default mysqlConnection;