import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCreator.css';

const EventCreationPage = () => {
    const [formData, setFormData] = useState({
        eventDate: '',
        eventLocation: '',
        eventTime: '',
        eventContent: '',
        attendeeCapacity: '',
        eventTitle: '',
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const { eventDate, eventLocation, eventTime, eventContent, attendeeCapacity, eventTitle } = formData;

        // Validate inputs
        if (!eventDate || !eventLocation || !eventTime || !eventContent || !attendeeCapacity || !eventTitle) {
            alert('Please fill in all fields.');
            return;
        }

        if (isNaN(attendeeCapacity) || attendeeCapacity <= 0) {
            alert('Attendee capacity must be a positive number.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/Event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
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
        <div className="event-creation-page">
            <h1>Create an Event</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleCreate}>
                {/* Event Title */}
                <div className="form-group">
                    <label htmlFor="eventTitle">Event Title</label>
                    <input
                        type="text"
                        id="eventTitle"
                        name="eventTitle"
                        placeholder="Enter the event title"
                        value={formData.eventTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Event Date */}
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Event Time */}
                <div className="form-group">
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                        type="time"
                        id="eventTime"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Event Location */}
                <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                        type="text"
                        id="eventLocation"
                        name="eventLocation"
                        placeholder="Enter the event location"
                        value={formData.eventLocation}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Event Content */}
                <div className="form-group">
                    <label htmlFor="eventContent">Event Content</label>
                    <textarea
                        id="eventContent"
                        name="eventContent"
                        rows="4"
                        placeholder="Describe the event..."
                        value={formData.eventContent}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Attendee Capacity */}
                <div className="form-group">
                    <label htmlFor="attendeeCapacity">Attendee Capacity</label>
                    <input
                        type="number"
                        id="attendeeCapacity"
                        name="attendeeCapacity"
                        placeholder="Enter maximum attendees"
                        value={formData.attendeeCapacity}
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

export default EventCreationPage;