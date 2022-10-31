const express =require("express");
const app  = express();
const ck = require("ckey");


app.get("/api",(req,res)=>{
    res.json({
        success:1,
        message:"This is rest api is working"
    });
});

app.listen(ck.APP_PORT,()=>{
    console.log("Server is starting at the port number : ",ck.APP_PORT);
});