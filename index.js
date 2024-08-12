var express = require("express");
var mdb = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
var User = require('./models/userSchema')
var app = express();
var allowedOrigins = ["http://localhost:3000"]
app.use(
    cors({
        origin:allowedOrigins,
        credentials:true,
        methods:["GET","POST"]
    })
)

mdb.connect("mongodb+srv://ksprasanthksp10:Ksp%401009@skcet.ow7ni.mongodb.net/SKCET")
var db = mdb.connection
db.once("open",()=>{
    console.log("MongoDB Connection Successful");
})
app.get("/", (request, response) => {
  response.send("Welcome to Backend Server");
});
app.use(bodyParser.json())

app.post("/signup",(request, response)=>{
    console.log("This is the payload coming from frontend",request.body);
    var {username, name, email, password} = request.body
    console.log(email, username, name, password)
    var newUser = new User({
        email:email,
        username:username,
        name:name,
        password:password
    }) 
    newUser.save().then(()=>{
        console.log(response);
        return response.json({message:"User Added"})
    }).catch((e)=>{
        console.log(e);
        return response.json({message:e})
    })
})
app.listen(3001, () => console.log("Backend Started"));
