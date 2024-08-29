import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useShared } from '../SharedContext';

const EditCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId, name, description } = location.state;
    const {apiBaseUrl} = useShared()

    const [courseName, setCourseName] = useState(name);
    const [courseDescription, setCourseDescription] = useState(description);


    const handleEditCourse = () => {
        axios.patch(`${apiBaseUrl}/courses/${courseId}`, {
            name: courseName,
            description: courseDescription
        }, {
            withCredentials: true
        })
        .then(function (response) {   
            console.log(response.data)  
            toast.success("Course updated successfully!");
            setTimeout(() => {
                navigate('/Course/allcourses');
            }, 2000);
        })
        .catch(function (error) {
            toast.error(error.response.data.message)
        });
    }

    return (
        <div>
            <h1>Edit Course here</h1><br /><br />
            <p>Enter new name</p>
            <input 
                type="text" 
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <br /><br />
            <p>Enter new description</p>
            <input 
                type="text" 
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
            />
            <br /><br />
            <button onClick={handleEditCourse}>Edit course</button>
            <ToastContainer />
        </div>
    );
}

export default EditCourse;
