import { useState } from "react";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    
      const { email, firstName, lastName, username, password, confirmPassword } = formData;
    
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:8080/api/users/register', {
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
          alert('Error registering user');
        }
      };
    
      return (
        <form onSubmit={onSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" value={firstName} onChange={onChange} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" value={lastName} onChange={onChange} required />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={onChange} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
      );
}