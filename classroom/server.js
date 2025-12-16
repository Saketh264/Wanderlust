const express=require("express")
const app= express()
const session= require("express-session")
app.use(session({secret:"supersecretstring", resave:false,saveUninitialized:true}))
app.get("/test",(req,res)=>{
    res.send("success")
})
app.listen(8080,(req,res)=>{
    console.log("listening to the port sir!")
})