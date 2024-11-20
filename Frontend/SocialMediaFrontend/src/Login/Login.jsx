import { useState } from "react";
import TitleBar from "../UniversalComponents/TitleBar/TitleBar.jsx";
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLoginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                navigate("/HomePage");
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const handleSignUpClick = () => {
        navigate('/register'); 
    };

    return (
        <>
            <TitleBar />
            <div className="login-card">
                <div className="page-header">
                    <p>Log in</p>
                </div>
                <input className="login-input" id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input className="login-input" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}required />
                <a href="www.google.com">Forgot Password?</a>
                <div className="button-div">
                    <button
                        type="submit"
                        className="login-buttons"
                        onClick={handleLoginClick}
                    >
                        Log in
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
