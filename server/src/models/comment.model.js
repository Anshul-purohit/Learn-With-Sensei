const mongoose = require('mongoose')
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2")
const {Schema} = mongoose;

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser"
    },
    replies:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    parent:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }

},{timestamps:true})

commentSchema.plugin(mongooseAggregatePaginate) // for pagination 
const Comment = mongoose.model("Comment",commentSchema)

module.exports={
    Comment
}