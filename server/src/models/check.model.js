const mongoose = require("mongoose")
const {Schema} = mongoose;

const checkSchema = mongoose.Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    checkedBy:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser"
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Courses"
    }
},{timestamps:true})

const Check = mongoose.model("Check",checkSchema)

module.exports={
    Check
}



