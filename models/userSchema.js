var mdb = require('mongoose')

var userSchema = mdb.Schema({
    email:String,
    username: String,
    name: String,
    password: String
})

var user_schema = mdb.model("users",userSchema)
module.exports = user_schema;