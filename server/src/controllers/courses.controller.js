const { Courses } = require("../models/courses.model");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { Like } = require("../models/like.model");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../utils/cloudinary");
const { Payment } = require("../models/payment.model");


const getAllCourses = asyncHandler(async (req, res, next) => {
    // Extract query parameters with default values
    const { query, sortBy, sortType, userId } = req.query;
    // console.log(req.query);
    // Initialize the query object
    const queryObj = {};
   
    // If a query is provided, add it to the query object
    if (query) {
        queryObj.name = { $regex: query, $options: "i" };  // Case-insensitive regex search on title
    }

    // Initialize the sort object
    const sortObj = {};

    // If sorting is provided, add it to the sort object else by default it should be in ascending order
    if (sortBy) {
        sortObj[sortBy] = sortType === 'desc' ? -1 : 1;
    }

   
    try {
        let courses;

        // If userId is provided, fetch courses for that user
        if (userId) {
            courses = await Courses
                .find({ owner: userId, ...queryObj })  // Include queryObj in the find condition
                .sort(sortObj);
                
        } else {
            courses = await Courses
                .find(queryObj)  // Include queryObj in the find condition
                .sort(sortObj);
                
        }
        console.log(courses);
        // If no courses are found, throw an error
        if (!courses || courses.length === 0) {
            return next( new ApiError(404, "No courses found"));
        }
        // Return the response
        return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
    } catch (error) {
        // Handle errors
        return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching courses"));
    }
});

const createCourse = asyncHandler(async (req, res,next) => {
    const { name, description ,category } = req.body;
    if (!name || !description || !category) {
        return next( new ApiError(400, "fill all the required fields"));
    }
    let avatarLocalPath;

if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
    avatarLocalPath = req.files.thumbnail[0].path;
} else {
    return next( new ApiError(400, 'Please provide Thumbnail'));
}
    if (!avatarLocalPath) {
        return next( new ApiError(400, 'Please provide Thumbnail'));
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar);
    if(!avatar){
        return next( new ApiError(400,"Error while uploading thumbnail"))
    }

    const course = await Courses.create({
        name: name,
        description: description,
        category: category,
        owner: req.user._id,
        videos: [],
        thumbnail: avatar.url
    })


    if (!course) {
        return next( new ApiError(400, "Something went wrong while creating course"))
    }
    return res.status(201).json(new ApiResponse(201, course, "Course created successfully"))

})

const getUserCourses = asyncHandler(async (req, res,next) => {

    const { userId } = req.params

    if (!userId || !userId.trim()) {
        return next(new ApiError(400, "user id is required"))
    }
    
    const courses = await Payment.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userId),
            }
            
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseID",
                foreignField: "_id",
                as: "course",
            }
        },
        {
            $unwind: "$course" // Unwind the course array to work with individual course objects
        },
        
    ]);
    
    // console.log(courses);
    // do not show password in response
        

    if (!courses) {
        return next( new ApiError(404, "No courses found"))
    }
    return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"))

}
)

const getCourseById = asyncHandler(async (req, res,next) => {

    const { courseId } = req.params

    if (!courseId || !courseId.trim()) {
        return next( new ApiError(400, "course id is required"))
    }
    const Checkcourse = await Courses.findById(courseId)

    if (!Checkcourse) {
        return next( new ApiError(404, "Course not found"))
    }
    // The final result of this aggregation operation will be a Playlist document containing an array videos, where each video object includes enriched details of its owner from the users collection. This structure allows you to fetch detailed information about each video, including its owner's full name, creation date, and avatar.
    const course = await Courses.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos",
                pipeline: [
                    {
                        $lookup: {
                            from: "authusers",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        createdAt: 1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner",
                            },
                        },
                    },
                    {
                        $project: {
                            title: 1,
                            description: 1,
                            duration: 1,
                            views: 1,
                            createdAt: 1,
                            _id: 1,
                            videoFile: 1,
                            thumbnail: 1,
                            owner: 1,
                            
                        },
                    },
                ],
            },
        },
    ]);

    if (!course) {
        return next( new ApiError(404, "Course not found"))
    }
    // return userid who bought this course
    const users = await Payment.find({courseID:courseId})
    // console.log(users);
    // traverse users and only select userID and store in array
    const users_bought_course_id = [];
    for (let i = 0; i < users.length; i++) {
        users_bought_course_id.push(users[i].userID)
    } 
    // console.log(userss);
    return res.status(200).json(new ApiResponse(200, {course,users_bought_course_id}, "Course fetched successfully"))

})

const addVideoToCourse = asyncHandler(async (req, res,next) => {
    let { courseId , videoId } = req.params

    if (!courseId || !courseId.trim()) {
        return next( new ApiError(400, "course id is required"))
    }   

    if (!videoId || !videoId.trim()) {
        return next( new ApiError(400, "video id is required"))
    }   
    courseId = courseId.trim();
    videoId = videoId.trim();
    const course = await Courses.findByIdAndUpdate(
        courseId,
        {
            $push: {
                videos: videoId
            }
        },
        { new: true }
    );

    if (!course) {
        return next( new ApiError(404, "Course not found"))
    }
    return res.status(200).json(new ApiResponse(200, course, "Video added to course successfully")) 
})

const removeVideoFromCourse = asyncHandler(async (req, res, next) => {

    let { courseId , videoId } = req.params
    if (!courseId || !courseId.trim()) {
        return next( new ApiError(400, "course id is required"))
    }   

    if (!videoId || !videoId.trim()) {
        return next( new ApiError(400, "video id is required"))
    }   
    courseId = courseId.trim();
    videoId = videoId.trim();
    const course = await Courses.findByIdAndUpdate(
        courseId,
        {
            $pull: {
                videos: videoId
            }
        },
        { new: true }
    );

    if (!course) {
        return next( new ApiError(404, "Course not found"))
    }
    return res.status(200).json(new ApiResponse(200, course, "Video removed from course successfully"))
})

const deleteCourse = asyncHandler(async (req, res, next) => {

    const { courseId } = req.params
    if (!courseId || !courseId.trim()) {
        return next( new ApiError(400, "course id is required"))
    }
    const course = await Courses.findByIdAndDelete(courseId)
    if (!course) {
        return next( new ApiError(404, "Course not found"))
    }

    // delete thumbnail from cloudinary
   const thumb = await deleteOnCloudinary(course.thumbnail)

    if (!thumb) {
        return next( new ApiError(400, "Something went wrong while deleting thumbnail"));
    }
    
    return res.status(200).json(new ApiResponse(200, course, "Course deleted successfully"))
})

const updateCourse = asyncHandler(async (req, res, next) => {

    const { courseId } = req.params
    const { name, description } = req.body
    if (!courseId || !courseId.trim()) {
        return next( new ApiError(400, "course id is required"))
    }

     // conditional update for name and description
     const existingCourse = await Courses.findById(courseId)

    if (!existingCourse) {
        return next( new ApiError(404, "Course not found"))
    }
   const updatename = name || existingCourse.name
   const updatedescription = description || existingCourse.description
    // // Handle thumbnail
let updatedThumbnail = existingCourse.thumbnail;

const thumbnailLocalPath = req.file?.path;
if (thumbnailLocalPath) {
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail.url) {
        return next( new ApiError(400, "Something went wrong while uploading thumbnail"));
    }
    updatedThumbnail = thumbnail.url;
}
const course = await Courses.findByIdAndUpdate(
    courseId,
    {
        $set: {
            name: updatename,
            description: updatedescription,
            thumbnail: updatedThumbnail
        }
    },
    { new: true }
);

if (!course) {
    return next( new ApiError(500, "Failed to update course"));
}

    return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"))
})


module.exports = {
    createCourse,
    getAllCourses,
    getUserCourses,
    getCourseById,
    addVideoToCourse,
    removeVideoFromCourse,
    deleteCourse,
    updateCourse
}