const mongoose=require("mongoose");


async function connectToDatabase() {
    try {
       await mongoose.connect('mongodb+srv://siddharthkumarrrrr:Sidd123@cluster0.7rhydih.mongodb.net/sid', {
    useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

connectToDatabase();


const AdminSchema=new mongoose.Schema({
    username:String,
    password:String
});

const userSchema =new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const courseSchema= new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number
});

const admin=mongoose.model("admin",AdminSchema);
const user=mongoose.model("user",userSchema);
const course=mongoose.model("course",courseSchema);


module.exports={
    admin,user,course
}
