
let admodel=require("../models/adminmodel");
exports.homePage=(req,res)=>{
    res.render("home.ejs");

};

exports.simple=(req,res)=>{
    res.send("simple page");
}

exports.loginpage=(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.send({error:"Email and password required"});
    }
   let promise=admodel.loginentry(email,password);
    promise.then((result)=>{
            res.send(result);

    })
    promise.catch((err)=>{
        res.status(401).send({error:err});
    })
    
}

exports.registerpage=(req,res)=>{
    let {name,email,password, role}=req.body;
    let created_at = new Date();
    if(!password||password.length<6){
        return res.send({error: "Password must be at least 6 charcters long"});
    }
    let promise=admodel.registerentry(name,email,password, role, created_at);
    promise.then((result)=>{
        res.send({result});
        
        });
    
     promise.catch((err)=>{
        res.send(err);
     })
   

}


exports.createschedule=(req,res)=>{
    let{ exam_id,start_time ,end_time  }=req.body;
    if(!exam_id || !start_time || !end_time ){
        return res.status(400).send({error:"all feilds are mandatory"});
    }
    let promise=admodel.createScehe(exam_id,start_time ,end_time );
    promise.then((result)=>{
        res.send({result});
    })
    promise.catch((err)=>{
        res.send(err);
    })

}

exports.addCourse=(req,res)=>{
    let{course_name}=req.body;
    let promise=admodel.addcoursedetails(course_name );
    promise.then((result)=>{
        res.send({result});
    })
    promise.catch((err)=>{
        res.status(400).send({error:err});
    })

}

exports.addexam=(req,res)=>{
    let{title ,total_marks,duration ,userid,course_id  }=req.body;
    let promise=admodel.addexamdetails(title ,total_marks,duration ,userid,course_id  );
    promise.then((result)=>{
        res.send({result});
    })
    promise.catch((err)=>{
        res.send(err);
    })

}