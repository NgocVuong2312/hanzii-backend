const mySql = require("mysql2/promise")
const mySqlPool =  mySql.createPool({
    host:"localhost",
    user:"root",
    password:"Vuong123!",
    database:"Hanzii"
})

module.exports= mySqlPool