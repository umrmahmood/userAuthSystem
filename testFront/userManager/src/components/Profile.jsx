import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/user/${userId}`
                );
                console.log("User Data:", response);
                setProfile(response.data);
                console.log("profile", profile);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <h2>My Profile</h2>
            <div className="card-wrapper">
                <ul className="card">
                    <li className="card-single">
                        <div>
                            <div>Name: {profile.profile && profile.profile.firstName} {profile.profile && profile.profile.lastName}</div>
                            <div>Username: {profile.username}</div>
                            <div>Email: {profile.email}</div>
                            <div>Address: {profile.profile && profile.profile.address && profile.profile.address.street1}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};
export default Profile;