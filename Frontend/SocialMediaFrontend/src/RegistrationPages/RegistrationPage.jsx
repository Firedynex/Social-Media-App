import { useState } from "react";
import './RegistrationPage.css';
import TitleBar from "../UniversalComponents/TitleBar/TitleBar";
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          username,
          password,
        }),
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorMessage = await response.text(); // Read plain text error
        throw new Error(errorMessage);
      }
  
      // Handle plain text success response
      const successMessage = await response.text();
      alert(successMessage); // Display server response
      navigate('/HomePage');
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err.message);
      alert(err.message || 'An error occurred');
    }
  };

  return (
    <>
      <TitleBar />
      <form className="sign-in" onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}