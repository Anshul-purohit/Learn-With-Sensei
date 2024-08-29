import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UpdateVideo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { courseId, name, description, thumbnail, videoId } = location.state;

    const [uname,setUname] = useState("");
    const [udescription,setUdescription] = useState("");
    const [uthumbnail,setUthumbnail] = useState(null);

    const handleUpdateVideo = async () => {
        console.log(uname)
        console.log(udescription)
        console.log(uthumbnail)
        console.log(courseId)
        const formData = new FormData();
        formData.append('title', uname || name);
        formData.append('description', udescription || description);
        formData.append('thumbnail', uthumbnail || thumbnail);

        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/videos/c/${videoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response.data);
            toast.success("Video updated successfully!");
            setTimeout(() => {
                navigate(`/Course/${courseId}`);
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return(
        <div>
            <h1>Update video here :</h1>
            <br /><br /><br /><br />

            <p>Add new title</p>
            <input type="text" onChange={(e) => setUname(e.target.value)}/>
            <br /><br />
            <p>Add new description</p>
            <input type="text" onChange={(e) => setUdescription(e.target.value)}/>
            <br /><br />
            <p>Add new thumbnail</p>
            <input type="file" onChange={(e) => setUthumbnail(e.target.files[0])}/>
            <br /><br />
            <button onClick={handleUpdateVideo}>Update video</button>
        </div>
    )
}

export default UpdateVideo;