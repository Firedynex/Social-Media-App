import InputBox from "../UniversalComponents/InputBox";

export default function RegistrationPage() {
    return (
        <div id="page-header">
            <div id="registration-header">
                <p>Registration</p>
            </div>
            <div id="registration-fields">
                <p>Email Address*</p>
                <InputBox headerName={"email-address-bar"} type={"email"} />
                <p>Username*</p>
                <InputBox headerName={"username"} />
                <p>Password*</p>
                <InputBox headerName={"password"} type={"password"} />
                <p>Confirm Password</p>
                <InputBox headerName={"password"} type={"password"}/>
                <p>First Name</p>
                <InputBox headerName={"first-name"} type={"text"} />
                <p>Last Name</p>
                <InputBox headerName={"last-name"} type={"text"} />
                <p>*Required</p>
            </div>
            <div>
                <button>Login</button>
                <button>Register</button>
            </div>
        </div>
    );
}