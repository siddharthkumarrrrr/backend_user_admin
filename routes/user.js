const express=require("express");
const usermiddleware=require("../middlewares/user");
const bodyParser=require("body-parser");
const {user,course}=require("../db")
const router=express.Router();

router.use(bodyParser.json());

router.post("/signup", async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
  
      const userexist=user.findOne({username,password});
    if(userexist){
        res.status(500).json({ msg:"user is singuped already"});
    }

    try{
    const newuser=await user.create({
        username,
        password
    });
   res.json({msg:"new user is created successfully"});}
 catch(err){
    res.status(400).json({error:"Error in creation of new user"});
 }
});

router.post("/courses/coursesid",usermiddleware,async(req,res)=>{
   const courseid=req.params.courseid;
   const username=req.headers.username;
   await user.updateOne({
    username
   },
  {
  "$push":{
    purchasedCourse:courseid
  }
  }
)
res.json({msg:"course added successfully"});
  

});

router.post("/signup", async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
  
      const userexist=user.findOne({username,password});
    if(userexist){
        res.status(500).json({ msg:"user is singuped already"});
    }

    try{
    const newuser=await user.create({
        username,
        password
    });
   res.json({msg:"new user is created successfully"});}
 catch(err){
    res.status(400).json({error:"Error in creation of new user"});
 }
});

router.post("/courses/:courseid",usermiddleware,async(req,res)=>{
   const courseid=req.params.courseid;
   const username=req.headers.username;
   await user.updateOne({
    username
   },
  {
  "$push":{
    purchasedCourse:courseid
  }
  }
)
res.json({msg:"course added successfully"});
  

});

router.get("/purchasedcourses",  async (req, res) => {
  
    const username = req.headers.username;

    const user1 = await user.findOne({ username });

    if (!user1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const courses = await course.find({
      _id: {
        "$in": user1.purchasedCourse
      }
    });

    res.status(200).json(courses);

});

module.exports=router;
