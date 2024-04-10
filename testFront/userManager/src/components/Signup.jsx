import React, { useState } from "react";
import axios from "axios";

const Signup = ({ navigate }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        address: {
            street1: "",
            street2: "",
            city: "",
            country: "",
            zip: ""
        }
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username,
                password,
                email,
                profile
            };
            const response = await axios.post("api/user/register", newUser);
            console.log(response.data);
            setShowSuccessMessage(true);
            resetForm();
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (error) {
            console.log("signup failed", error)
        }
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setEmail("");
        setProfile({
            firstName: "",
            lastName: "",
            address: {
                street1: "",
                street2: "",
                city: "",
                country: "",
                zip: ""
            }
        });
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            address: {
                ...prevProfile.address,
                [name]: value
            }
        }));
    };


    return (
        <div>
            <p>* are required for signup</p>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="e-Mail *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h2>Profile:</h2>
                <p>Information can be updated in the future.</p>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                />
                <input
                    type="text"
                    name="street1"
                    placeholder="Street1"
                    value={profile.address.street1}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="street2"
                    placeholder="Street2"
                    value={profile.address.street2}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={profile.address.city}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={profile.address.country}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip-Code"
                    value={profile.address.zip}
                    onChange={handleAddressChange}
                />
                <button type="submit">Signup</button>
            </form>
            {showSuccessMessage && (<div style={{ color: "green" }}>Signup Successful. Redirecting to login in 5...sec.</div>)}
        </div>

    )
};

export default Signup;