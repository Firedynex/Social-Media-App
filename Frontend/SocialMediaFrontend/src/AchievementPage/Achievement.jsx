import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router
import './Achievement.css';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const AchievementsForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const token = Cookies.get('jwtToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub
    if (!email) {
        alert('Invalid token. Please log in again.');
        navigate('/login');
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, date, description } = formData;

        if (!title || !date || !description) {
            setMessage('Please fill in all fields.');
            return;
        }



        try {
            const response = await fetch(`http://localhost:8080/achievement`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    title,
                    date,
                    description
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Post created successfully!');
                setFormData({ title: '', date: '', description: '' }); // Clear form on success
                navigate('/HomePage');
            } else {
                const errorText = await response.text();
                alert(errorText || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error during post creation:', error);
            alert('An error occurred while creating the post. Please try again.');
        }
    };

    return (
        <>
        <TitleBar />
        <div className="achievements-form">
            <h1>Submit an Achievement</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter the achievement title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Achievement Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Describe your achievement..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
        </>
    );
};

export default AchievementsForm;