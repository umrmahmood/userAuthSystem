import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import GithubLogin from "react-github-login";

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
        console.log(res);
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
                    buttonText={"GITLOGIN"}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />



                {/* 
                <MicrosoftLogin></MicrosoftLogin>
                <FacebookLogin></FacebookLogin>
                <TwitterLogin></TwitterLogin> */}
            </div >
        </div >

    )
};

export default Login;