const mongoose = require("mongoose")
const {Schema} = mongoose;

const NotesSchema = mongoose.Schema({
    notes:{
        type:String,
        required:false,
       

    },
    ownerID:{
        type:Schema.Types.ObjectId,
        ref:"AuthUser",
        required:true
    },
    videoID:{
        type:Schema.Types.ObjectId,
        ref:"Video",
        required:true
    }
},{timestamps:true})

const Notes = mongoose.model("Notes", NotesSchema);

module.exports={
    Notes
}

