console.log("Run index.js file");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
});

connection.connect(function (err) {
  if (err) {
    return console.log("Ошибка, " + err.message + "name err: " + err.name);
  } else {
    console.log("Подключение к серверу успешно установлено");
  }
});
