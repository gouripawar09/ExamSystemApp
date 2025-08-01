
let admodel=require("../models/adminmodel");
let jwt=require("jsonwebtoken");
exports.homePage=(req,res)=>{
    res.render("home.ejs");

};



exports.loginpage=(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.send({error:"Email and password required"});
    }
   let promise=admodel.loginentry(email,password);
    promise.then((result)=>{
            const user=result.user;

            const token=jwt.sign(
                {id:user.id,emial:user.email,role:user.role},
                process.env.jwt_secret,
                {expiresIn:"15m"}
            );
            res.send({
                message:result.message,
                token,
                user,
            })
            });

         promise.catch((err)=>{
        res.status(401).send({error:err});
    });
    

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
//imp ctrl
exports.searchSchedByDate = (req, res) => {
    const created_at = req.params.created_at;

    admodel.searchScheduleByDate(created_at)
        .then(results => {
            if (results.length === 0) {
                return res.status(404).send('No Exam found');
            }

            let output = '';
            for (const row of results) {
                output += `Shedule ID: ${row. schedule_id}, examid: ${row.exam_id}, StartTime: ${row.start_time}, EndTime: ${row.end_time} \n`;
            }

            console.log("Searching for exam on:", created_at);
            res.send(output);
        })
        .catch(err => {
            res.status(500).send('Database error: ' + err);
        });
};

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

exports.getallSchedule=(req,res)=>{
    let promise=admodel.getSchedule();
    promise.then((result)=>{
        res.send({result});
    })
    promise.catch((err)=>{
        res.send(err);
    })
}


exports.deleteScheduleById=(req,res)=>{
    let schedule_id =req.params.schedule_id;
    let promise=admodel.deleteSchedule(schedule_id);

    if(!schedule_id){
      return res.send({error:"schedule_id is required "});
    }
    promise.then((result)=>{
        res.send({result});
    })
    promise.catch((err)=>{
        res.send(err);
    })
}

exports.getScheduleById=(req,res)=>{
    const schedule_id=req.params.schedule_id;
    let promise=admodel.fetchScheduleById(schedule_id);
    promise.then((result)=>{
        if(result.length===0)
        {
            res.send("No schedule Found");
        }
        else{
            res.send(result[0]);
        }
    })
    promise.catch((err)=>{
        res.send("Error"+err);
    });
}

exports.updateshedule=(req,res)=>{
    let{schedule_id,exam_id,start_time ,end_time}=req.body;
    console.log( exam_id);
    let promise=admodel.upschedulDeta(schedule_id,exam_id,start_time ,end_time);
    p.then((result)=>{
        res.send({schedule: result,msg:"success"})
    })
    .catch((err)=>{
        res.send({error:err});
    });
}


