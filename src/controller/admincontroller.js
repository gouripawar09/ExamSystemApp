
let admodel=require("../models/adminmodel");
exports.homePage=(req,res)=>{
    res.render("home.ejs");

};

exports.simple=(req,res)=>{
    res.send("simple page");
}

exports.loginpage=(req,res)=>{
    const{email,password}=req.body;
   let promise=admodel.loginentry(email,password);
    promise.then((result)=>{
            res.send(result);

    });
    
}

exports.registerpage=(req,res)=>{
    let {name,email,password, role}=req.body;
    let created_at = new Date();
    
    let promise=admodel.registerentry(name,email,password, role, created_at);
    promise.then((result)=>{
        res.send({result});
        
        });
    
     promise.catch((err)=>{
        res.send(err);
     })
   

}
