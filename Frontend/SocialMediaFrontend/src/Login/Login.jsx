import InputBox from "../UniversalComponents/InputBox";
import "./Login.css";

export default function Login() {
    return(
        <>
            <div className="login-card">
                <div className="page-header">
                    <p>Login</p>
                </div>
                <InputBox headerName={"Username"} type={"text"} placeholder={"Username"}/>
                <InputBox headerName={"Password"} type={"password"} placeholder={"Password"}/>
                <a href="www.google.com">Forgot Password?</a>
                <div className="button-div">
                    <button className="login-buttons">Login</button>
                    <button className="login-buttons">Sign Up</button>
                </div>
            </div>
        </>
    );
}