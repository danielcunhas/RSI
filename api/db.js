import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Dani2004@",
    database: "crudalunos",
});