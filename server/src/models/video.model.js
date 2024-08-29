const mongoose = require("mongoose")
const {Schema} = mongoose;
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2")
const videoSchema = mongoose.Schema({
   videoFile:{
        type:String,
        required:true
   },
   owner:{
    type:Schema.Types.ObjectId,
    ref:"AuthUser"
   },
   title:{
    type:String,
    required: [true, "Please Enter Video Title"],
        minlength: [4, "Title must be at least 4 characters"],
        maxlength: [80, "Title can't exceeds 80 characters"]
   },
   description:{
    type:String,
    required: [true, "Please Enter Course Description"],
        minlength: [4, "Description must be at least 4 characters"]
    
   },
   duration:{
    type:Number,
    required:true
   },
   views:{
    type:Number,
    // required:true
    default:0
   },
   isPublished:{
    type:Boolean,
    // required:true
    default:true
   },
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
const Video = mongoose.model("Video",videoSchema)

module.exports={
    Video
}