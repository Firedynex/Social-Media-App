import InputBox from "../UniversalComponents/InputBox";

export default function Login() {
    return(
        <>
            <div className="LoginCard">
                <div className="LoginHeader">
                    <p>Login</p>
                </div>
                <InputBox headerName={"Username"} type={"text"}/>
                <InputBox headerName={"Password"} type={"password"}/>
            </div>
        </>
    );
}