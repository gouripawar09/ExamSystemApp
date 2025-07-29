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
            /*const user=results[0];*/
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

                
        