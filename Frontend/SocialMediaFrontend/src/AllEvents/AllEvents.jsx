import React, { useEffect, useState } from 'react';
import './AllEvents.css'; // Importing styles
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const AllEventsPage = () => {
    const [events, setEvents] = useState([]);
    const token = Cookies.get('jwtToken'); // Retrieve the token from cookies
    const [guestCount, setGuestCount] = useState({});


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

    const handleGuestAmountChange = (eventId, value) => {
        setGuestCount((prev) => ({ ...prev, [eventId]: value }));
      };

      const handleAddGuests = async (eventId) => {
        const guestAmount = guestCount[eventId] || 0;
    
        try {
          const response = await fetch("http://localhost:8080/attendees", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, guestCount: parseInt(guestAmount, 10) }),
          });
          console.log("eventId", eventId);
          console.log("guestAmount", guestAmount);
    
          if (!response.ok) {
            throw new Error("Failed to add guests to the event");
          }
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.eventId === eventId
                    ? { ...event, attendeeCount: event.attendeeCount + parseInt(guestAmount, 10) }
                    : event
            )
        );
    
          setGuestCount((prev) => ({ ...prev, [eventId]: "" })); // Clear input after successful submission
          
        } catch (err) {
          console.error(err.message);
        }
      };

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
                            <p><strong>Attendees: </strong> {event.attendeeCount}</p>

                            <input
                                    type="number"
                                    placeholder="Guest Amount"
                                    value={guestCount[event.eventId] || ""}
                                    onChange={(e) => handleGuestAmountChange(event.eventId, e.target.value)}
                                    />
                                    <button onClick={() => handleAddGuests(event.eventId)}>Add Guests</button>
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