import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
//import GithubLogin from "react-github-login";
import axios from "axios";


const Login = ({ navigate, isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
    // const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/user/login", { email: credential, username: credential, password });
            const { token, user } = response.data;
            console.log(response);
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("userId", user._id);
            setIsLoggedIn(true);
            setUserRole(localStorage.getItem("role"));
            navigate("/");
        } catch (error) {
            console.log("login failed", error);
        }
    };

    const onSuccess = (res) => {
        console.log(res);
        // alert(`Welcome ${res.profileObj.name}`);
        localStorage.setItem("profile", JSON.stringify({ res }));

        setIsLoggedIn(true);
        navigate("/");

    };

    const onFailure = (res) => {
        console.log(res);
    };


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        id="credential"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                <GoogleLogin
                    clientId={"135873137906-mvdousn5i0onq1mndi4kgbrm155rst51.apps.googleusercontent.com"}
                    buttonText="Google Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
                <br />
                {/* <GithubLogin
                    clientId={"a80b12d7481f823057b1"}
                    buttonText={"GitHub Login"}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                /> */}
                {/* 
                <MicrosoftLogin></MicrosoftLogin>
                <FacebookLogin></FacebookLogin>
                <TwitterLogin></TwitterLogin> */}
            </div>
        </div>

    )
};

export default Login;