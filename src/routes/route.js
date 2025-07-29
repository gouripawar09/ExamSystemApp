let express=require("express");
let adminctrl=require("../controller/admincontroller");
let adminmodel=require("../models/adminmodel");

let router=express.Router();
router.get("/",adminctrl.homePage);
router.get("/s",adminctrl.simple)
router.post("/register",adminctrl.registerpage);
router.post("/login",adminctrl.loginpage);

module.exports=router;