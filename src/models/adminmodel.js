let db=require("../../db.js");

exports.registerentry=(name,email,password, role, created_at)=>{
      return new Promise((resolve,reject)=>{
        db.query("insert into users (name, email, password, role, created_at) values (?,?,?,?,?)",[name,email,password, role, created_at],(err,result)=>{
            if(err){

                console.log(err);
                reject("not save" +err);
            }
            else{
                resolve("registeration sucessfull");
            }
        })
    })   
}

exports.loginentry=(email,password)=>{
return new Promise((resolve,reject)=>{
    db.query("select * from users where email=? and password=?",[email,password],(err,results)=>{
        if(err){
            console.log("Database error",err);
            return reject("datbase error");
            
        }
       
            if(results.length===0){
                return reject("Invalid email and password");
            }
            const user=results[0];
           /* if(user.role!=='admin'&& user.role!=='student'){
                 console.log("not valid login");

            }*/
            
              resolve({
             message: "Login successful",
            user: {
            id: user.userid,
            name: user.name,
            email: user.email,
            role: user.role
        }
      });
    });
})
};

exports.createScehe=(exam_id,start_time ,end_time)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select s.* from schedule s join exam e on s.exam_id=e.exam_id where e.course_id=(select course_id from exam where exam_id=?) and date(s.start_time)=date(?)`,[exam_id,start_time],(err,result)=>{
            if(err){
                return reject("Database Error");
            }
             if(result.length>0){
                    return reject("Schedule already exist");
            
             }
        });

        db.query("insert into schedule(exam_id,start_time ,end_time) values(?,?,?)",[exam_id,start_time ,end_time],(err,results)=>{
            if(err){
                console.log("schedule not create");
                 return reject(err);

            }
            else{
                resolve("Schedule generated");
            }
        })
    })
}

exports.addcoursedetails=(course_name)=>{
     return new Promise((resolve,reject)=>{
        db.query("insert into course(course_name) values(?)",[course_name],(err,results)=>{
            if(err){
                console.log("course not added");
                 return reject(err);

            }
            else{
                console.log("Mysql insert result",results);
                resolve("course added");
            }
        })
    })
}

exports.addexamdetails=(title ,total_marks,duration ,userid,course_id  )=>{
     return new Promise((resolve,reject)=>{
        db.query("insert into exam(title ,total_marks,duration ,userid,course_id,created_at) values(?,?,?,?,?)",[title ,total_marks,duration ,userid,course_id,created_at],(err,results)=>{
            if(err){
                console.log("exam not added");
                 return reject(err);

            }
            else{
                resolve("exam added");
            }
        })
    })
}



        