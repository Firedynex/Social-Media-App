import TitleBar from "../UniversalComponents/TitleBar/TitleBar.jsx";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLoginClick = () => {
        navigate('../movieListPage'); //home page? 
    };

    const handleSignUpClick = () => {
        navigate('/register'); 
    };

    return (
        <>
            <TitleBar />
            <div className="login-card">
                <div className="page-header">
                    <p>Login</p>
                </div>
                <input className="login-input" id="userName" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input className="login-input" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}required />
                <a href="www.google.com">Forgot Password?</a>
                <div className="button-div">
                    <button
                        type="button"
                        className="login-buttons"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="login-buttons"
                        onClick={handleSignUpClick}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
}
