import React, { useState, useEffect } from "react";
import axios from "axios";

export const AdminPage = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/user");
                const users = response.data;
                console.log(users);
                setAllUsers(users);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/${id}`);
            // Update the user list after deletion
            const updatedUsers = allUsers.filter((user) => user._id !== id);
            setAllUsers(updatedUsers);
        } catch (err) {
            console.error("Error deleting user:", err);
            // Optionally, show an error message to the user
        }
    };


    const listItem = allUsers.map((user, index) => (
        <li className="card-single" key={index}>
            <div>
                <div>
                    {user.profile.firstName} {user.profile.lastName}
                </div>
                <div>username: {user.username}</div>
                <div>{user.email}</div>
                <div>Address: {user.profile.address.street1}</div>
                <button onClick={() => deleteHandler(user._id)}>delete</button>
            </div>
        </li>
    ));

    return (
        <>
            <h2>Admin Privileges</h2>

            <div className="card-wrapper">
                <ul className="card">{listItem}</ul>
            </div>
        </>
    );
};

export default AdminPage;