const {user}=require("../db");
 const usermiddleware= function usermiddleware(req,res,next){
     username=req.header.username;
     password=req.header.password;
     user.findOne({
        username,
        password
     })
     .then(function(value){
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg:"user doesnt exist"
            })
       
        }
     })

}

module.exports=usermiddleware;