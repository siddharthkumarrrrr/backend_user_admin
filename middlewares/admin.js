const { admin } =  require( "../db/index") ;
const adminmiddleware=function adminmiddleware(req,res,next){
     username=req.headers.username;
     password=req.headers.password;
     admin.findOne({
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
 
module.exports=adminmiddleware