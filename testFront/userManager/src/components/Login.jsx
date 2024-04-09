import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import GithubLogin from "react-github-login";
import axios from "axios";


const Login = ({ navigate, isLoggedIn, setIsLoggedIn }) => {
    // const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/user/login", { email: credential, username: credential, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
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
        alert("Login failed");
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
                    clientId={"983437975986-hk1asuggkm1i6mg36t5gflhpjepsh9ht.apps.googleusercontent.com"}
                    buttonText="Google Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
                <br />
                <GithubLogin
                    clientId={"a80b12d7481f823057b1"}
                    buttonText={"GitHub Login"}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
                {/* 
                <MicrosoftLogin></MicrosoftLogin>
                <FacebookLogin></FacebookLogin>
                <TwitterLogin></TwitterLogin> */}
            </div>
        </div>

    )
};

export default Login;