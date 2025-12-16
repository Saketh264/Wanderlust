if(process.env.NODE_ENV!="production"){
  require("dotenv").config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRoute=require("./routes/listing.js")
const reviewRoute=require("./routes/review.js")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy= require("passport-local")
const User= require("./models/user.js")
const userRoute= require("./routes/user.js")
// MongoDB Connection
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// EJS and Static Files Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
const sessionOption={
  secret:"mysecretcode",
  resave: false,
  saveUninitialized:true,
  cookie:{
    expire: Date.now()+ 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly: true,
  }
}
app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error = req.flash("error")
  res.locals.currUser=req.user;
  next()
})
// app.get("/demouser",async (req,res)=>{
//   let fakeUser= new User ({
//     email: "checking@gmail.com",
//     username: "Student"
//   });
//   let registeredUser= await User.register(fakeUser,"helloWorld")
//   console.log(registeredUser)
// })
app.get("/", (req, res) => {
  res.send("I'm root route");
});
// --- ROUTES ---
app.use("/listing",listingRoute)
app.use("/listing/:id/reviews",reviewRoute)
app.use("/",userRoute)
// 404 Catch-All Handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});
// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { err });
});
// Server Listener
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
