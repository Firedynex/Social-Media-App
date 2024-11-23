import { useState } from "react";
import TitleBar from "../UniversalComponents/TitleBar/TitleBar.jsx";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Assume the token is in the response body as JSON
                const { token } = data; // Extract the token from the response
                console.log('Login successful:', data);

                // Save token to a cookie
                Cookies.set('jwtToken', token, {
                    path: '/',        // Make it available across the app
                    secure: true,     // Secure flag (use only over HTTPS in production)
                    sameSite: 'strict', // Protect from cross-site requests
                });

                // Navigate to the homepage after successful login
                navigate("/HomePage");
            } else {
                const errorText = await response.text();
                alert(`Login failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

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
                <input
                    className="login-input"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <a href="#">Forgot Password?</a>
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
