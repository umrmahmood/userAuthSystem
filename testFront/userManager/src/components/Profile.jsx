import React, { useState, useEffect } from "react";
import axios from "axios";

// export const Profile = () => {
// 	const [profile, setProfile] = useState([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get("http://localhost:5000/user");
// 				setProfile(response.data);
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	const listItem = profile.map((user, index) => (
// 		<li className="card-single" key={index}>
// 			<div>
// 				<div>
// 					{user.profile.firstName} {user.profile.lastName}
// 				</div>
// 				<div>Username: {user.username}</div>
// 				<div>{user.email}</div>
// 				<div>Address: {user.profile.address}</div>
// 			</div>
// 		</li>
// 	));

// 	return (
// 		<>
// 			<h2>My Profile</h2>
// 			<div className="card-wrapper">
// 				<ul className="card">{listItem}</ul>
// 			</div>
// 		</>
// 	);
// };


export const Profile = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/user");
                setProfiles(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const listItems = profiles.map((user, index) => (
        <li className="card-single" key={index}>
            <div>
                <div>
                    {user.profile.firstName} {user.profile.lastName}
                </div>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
                <div>Address: {user.profile.address}</div>
            </div>
        </li>
    ));

    return (
        <>
            <h2>My Profile</h2>
            <div className="card-wrapper">
                <ul className="card">{listItems}</ul>
            </div>
        </>
    );
};
