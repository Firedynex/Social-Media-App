import TitleBar from "../UniversalComponents/TitleBar/TitleBar.jsx";

import "./Login.css";

export default function Login() {
    return(
        <>
            <TitleBar />
            <div className="login-card">
                <div className="page-header">
                    <p>Login</p>
                </div>
                <input className="login-input" id="userName" type="text" placeholder="Username" required/>
                <input className= "login-input" id="password" type="password" placeholder="Password" required/>
                <a href="www.google.com">Forgot Password?</a>
                <div className="button-div">
                    <button className="login-buttons">Login</button>
                    <button className="login-buttons">Sign Up</button>
                </div>
            </div>
        </>
    );
}
