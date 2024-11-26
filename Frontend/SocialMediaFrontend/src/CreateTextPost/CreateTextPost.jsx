import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router
import './CreateTextPost.css';
import {jwtDecode }from "jwt-decode"; // Correctly imported as default
import Cookies from "js-cookie";

const AchievementsForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router navigation
    const token = Cookies.get('jwtToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, date, description } = formData;

        // Validate inputs
        if (!title.trim() || !date.trim() || !description.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/achievement', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    title: title,
                    date: date,
                    description: description,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert('Achievement submitted successfully!');
                navigate('/HomePage'); // Navigate to the homepage upon success
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            alert('An error occurred while submitting the achievement. Please try again.');
        }
    };

    return (
        <div className="achievements-form">
            <h1>Submit an Achievement</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
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

                {/* Date Field */}
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

                {/* Description Field */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        placeholder="Describe your achievement..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AchievementsForm;