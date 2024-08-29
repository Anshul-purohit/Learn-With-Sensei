import { useState } from "react";
import { useShared } from "../SharedContext";

const UserProfile = () => {

    // const {user} = useShared();

    return (
        <div>
            <h1>Hello from user Profile</h1>
            {/* {user.email} <br />
            {user.fullName} <br />
            {user.username} */}
        </div>
    )
}

export default UserProfile;