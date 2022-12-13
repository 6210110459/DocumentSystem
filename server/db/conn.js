const mysql = require("mysql2");

const conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "harsh2511",
    database: "userfileupload"
});

conn.connect((error)=>{
    if(error) throw error;
    console.log("connected !")
});

// module.exports = conn