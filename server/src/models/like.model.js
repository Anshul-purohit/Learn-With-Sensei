const mongoose = require('mongoose')
const {Schema} = mongoose;

const likeSchema = mongoose.Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    LikedBy:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser"
    }
},{timestamps:true})

const Like = mongoose.model("Like",likeSchema)

module.exports={
    Like
}