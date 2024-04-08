import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
    };

    const onSuccess = (res) => {
        console.log(res);
        alert(`Welcome ${res.profileObj.name}`);
        localStorage.setItem("profile", JSON.stringify({ res }));
    };

    const onFailure = (res) => {
        alert("Login failed");
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}