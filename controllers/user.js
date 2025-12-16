const User=require("../models/user.js")
module.exports.signUp=async(req,res)=>{
    try{
    let {username,email,password}=req.body
    const newUser= new User({email,username})
    const registeredUser= await User.register(newUser,password)
    console.log(registeredUser)
    req.login(registeredUser,(err)=>{
        if(err){
            return nex(err)
        }
         req.flash("success","Welcome to wanderlust!")
    res.redirect("/listing")
    })
    }
    catch(e){
        req.flash("error","User already exists!")
        res.redirect("/signup")
    }
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust!")
    const redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}
module.exports.logOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("error","logged out of user!")
        res.redirect("/listing")
    })
}