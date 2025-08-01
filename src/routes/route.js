let express=require("express");
let adminctrl=require("../controller/admincontroller");
let adminmodel=require("../models/adminmodel");
let examctrl=require("../controller/examcontroller");
let exammodel=require("../models/exammodel");
const{verifytoken,isAdmin}=require("../middleware/authmiddleware");

let router=express.Router();
router.get("/",adminctrl.homePage);

router.post("/api/admin/register",adminctrl.registerpage);
router.post("/api/admin/login",adminctrl.loginpage);


router.post("/api/addcourse",verifytoken,isAdmin,adminctrl.addCourse);

router.post("/api/schedule/addschedule",verifytoken,isAdmin,adminctrl.createschedule);
router.get("/api/schedule/getallSchedule",adminctrl.getallSchedule);
router.delete("/api/delete/schedule/:schedule_id",verifytoken,isAdmin,adminctrl.deleteScheduleById);
router.get('/api/schedule/:schedule_id',adminctrl.getScheduleById);
router.put("/api/schedule/update",verifytoken,isAdmin,adminctrl.updateshedule);
router.get("/api/schedule/:start_time",adminctrl.searchSchedByDate);




router.post("/api/addexam",adminctrl.addexam);
router.get("/api/exams/getallexams",examctrl.getallallexams);
router.get("/api/exam/:exam_id",verifytoken,isAdmin,examctrl.getexamById);
router.put("/api/exam/update",examctrl.updateexam);
router.delete("/api/delete/exam/:exam_id",verifytoken,isAdmin,examctrl.deleteexamById);
router.get('/api/exam/search/:created_at', examctrl.searchByDate);
router.post('/api/exam/:exam_id/schedule', examctrl.assignSchedule);



module.exports=router;