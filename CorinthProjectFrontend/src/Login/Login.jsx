import InputBox from "../UniversalComponents/InputBox";
import "./Login.css";

export default function Login() {
    return(
        <>
            <div className="login-card">
                <div className="login-header">
                    <p>Login</p>
                </div>
                <InputBox headerName={"Username"} type={"text"}/>
                <InputBox headerName={"Password"} type={"password"}/>
                <a href="www.google.com">Forgot Password?</a>
                <div className="button-div">
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
            </div>
        </>
    );
}