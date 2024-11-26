import React, { useEffect, useState } from 'react';
import './AllEvents.css'; // Importing styles
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const AllEventsPage = () => {
    const [events, setEvents] = useState([]);
    const token = Cookies.get('jwtToken'); // Retrieve the token from cookies

    // Fetch all events when the component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/events/getall', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include Bearer token
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setEvents(data); // Store all the events in state
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [token]);

    return (
        <div>
            <TitleBar />
        <div className="all-events-page">
            <h1>All Events</h1>
            <div className="events-container">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index} className="event">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Dates: </strong>{event.startDate} - {event.endDate}</p>
                            <p><strong>Location: </strong>{event.location}</p>
                        </div>
                    ))
                ) : (
                    <p>No events available.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default AllEventsPage;