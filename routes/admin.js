const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser"); // Add body-parser
const {admin} = require("../db/index"); // Assuming admin model is defined in admin.js
const {course} = require("../db/index");
const adminmiddleware = require("../middlewares/admin");


router.use(bodyParser.json());

router.post("/signup", async (req, res) => {
        const username=req.body.username;
        const password=req.body.password;
   
/*
try {
    const user = await admin.findOne({ username, password });
    if (user) {
        res.json({ msg: "User already exists" });
    }
} catch (error) {
    console.error("Error checking for existing user:", error);
    res.status(500).json({ error: "Internal server error" });
}


      
*/
admin.findOne({username,password})
        .then(function(value){
            if(value){
                res.json({
                    msg:"user  exist already"})
            }
 }); 
 


     try{
        await admin.create({
            username,
            password
        });
        res.json({ message: "Admin created successfully" });
}
 catch(err){
    res.status(500).json({
        msg:"internal server problem"
    });
 }
});

router.post("/course", adminmiddleware, async (req, res) => {
    try {
        const { title, description, imageLink, price } = req.body;

        const newCourse = await course.create({
            title,
            description,
            imageLink,
            price
        });

        res.json({ msg: "New course is added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/courses", async (req, res) => {
    try {
        const courses = await course.find({});
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
