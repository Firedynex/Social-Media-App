import React, { useState } from 'react';
import './Achievement.css';

const AchievementsForm = () => {
    const [formData, setFormData] = useState({
        title: '', // Added title field
        achievementDate: '',
        content: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, achievementDate, content } = formData;

        // Validate inputs
        if (!title || !achievementDate || !content) {
            setMessage('Please fill in all fields.');
            return;
        }

        setMessage('Achievement submitted successfully!');
        console.log('Submitted Achievement:', formData);

        // Clear the form after submission
        setFormData({ title: '', achievementDate: '', content: '' });
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

                {/* Achievement Date Field */}
                <div className="form-group">
                    <label htmlFor="achievementDate">Achievement Date</label>
                    <input
                        type="date"
                        id="achievementDate"
                        name="achievementDate"
                        value={formData.achievementDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Content Field */}
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="4"
                        placeholder="Describe your achievement..."
                        value={formData.content}
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