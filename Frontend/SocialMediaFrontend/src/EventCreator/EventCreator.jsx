import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCreator.css';
import {jwtDecode }from "jwt-decode"; // Correctly imported as default
import Cookies from "js-cookie";
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const EventCreationPage = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        title: '',
    });

    const token = Cookies.get('jwtToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const { startDate, endDate, location, description, title } = formData;

        // Validate inputs
        if (!startDate || !endDate || !location || !description || !title) {
            alert('Please fill in all fields.');
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date cannot be later than end date.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/events', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, // Include the email in the request body
                    startDate,
                    endDate,
                    location,
                    description,
                    title,
                }),
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                alert('Event created successfully!');
                navigate('/HomePage'); // Navigate to the homepage upon success
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error during event creation:', error);
            alert('An error occurred while creating the event. Please try again.');
        }
    };

    return (
        <>
        <TitleBar/>
        <div className="event-creation-page">
            <h1>Create an Event</h1>
            <form onSubmit={handleCreate}>
                {/* Title */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter the event title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Start Date */}
                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* End Date */}
                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Location */}
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter the event location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Describe the event..."
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
        </>
    );
};

export default EventCreationPage;