let express =require("express");
const { signupuser, signinuser } = require("../Controller/User.controller");
const { auth } = require("../middlewares/auth.middleware");

let UserRoutes=express.Router();


UserRoutes.post("/Signup",signupuser);
UserRoutes.post("/signin",auth,signinuser);


module.exports=UserRoutes