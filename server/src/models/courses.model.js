const mongoose = require('mongoose')
const {Schema} = mongoose;

const CoursesSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
videos:[{
    type:Schema.Types.ObjectId,
    ref:"Video"
}],
category: {
    type: String,
    required: true,
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"AuthUser"
},
thumbnail:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true,
    default:0
}
},{timestamps:true})

const Courses = mongoose.model("Courses",CoursesSchema);

module.exports={
    Courses
}