import { useState } from "react";
import './RegistrationPage.css';
import TitleBar from "../UniversalComponents/TitleBar/TitleBar";

export default function RegistrationPage() {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    
    const onSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    
      try {
        const response = await fetch('http://localhost:8080/users/register', {
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
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const resData = await response.json();
        console.log(resData);
        alert('Registration successful');
      } catch (err) {
        console.error('There was a problem with the fetch operation:', err);
        alert('User already exists');
      }
    };
    
    return (
      <>
      <TitleBar />
      <form className="sign-in" onSubmit={onSubmit}>
        <div >
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