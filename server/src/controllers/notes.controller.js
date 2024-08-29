const mongoose = require("mongoose")
const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const { ApiResponse } = require("../utils/ApiResponse")
const { Notes } = require("../models/notes.model")
const UpdateNotes = asyncHandler(async (req, res) => {
    const { description } = req.body;
    const { videoId } = req.params;

    if (!videoId || !videoId.trim() || videoId === undefined) {
        throw new ApiError(400, "Video ID for notes is required");
    }

    // Find the existing note
    let notes = await Notes.findOne({ ownerID: req.user._id, videoID: videoId });

    if (!notes) {
        throw new ApiError(404, "Note not found");
    }

    // Only update the note if a new description is provided
    
        notes.notes = description;
        await notes.save();
        return res.status(200).json(new ApiResponse(200, notes, "Notes updated successfully"));
    
});


const getNotes = asyncHandler(async (req, res) => {
    const { videoId} = req.params;
    if (!videoId || !videoId.trim() || videoId == undefined) {
        throw new ApiError(400, "Video ID for notes is required");
    }
    const notes = await Notes.findOne({ ownerID: req.user._id, videoID: videoId });
    if (!notes) {
        // create a new note
        const newNote = new Notes({
            notes: "",
            ownerID: req.user._id,
            videoID: videoId
        });
        
        await newNote.save();
        return res.status(201).json(new ApiResponse(201, newNote, "Notes created successfully"));
    }
    return res.status(200).json(new ApiResponse(200, notes, "Notes fetched successfully"));
});


module.exports={
    UpdateNotes,
    getNotes
}