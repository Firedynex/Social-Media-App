import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Importing styles
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
    // State variables to hold fetched data
    const [textPosts, setTextPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [guestCount, setGuestCount] = useState({});


    // Retrieve the token from cookies
    const token = Cookies.get('jwtToken');
    console.log(token);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchTextPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/textPost/getall', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include Bearer token
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                // Get the last 3 text posts
                setTextPosts(data.slice(-3));  // Slices the last 3 posts from the array
            } catch (error) {
                console.error('Error fetching text posts:', error);
            }
        };

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
                console.log(data);
                // Get the last 3 events
                setEvents(data.slice(-3)); // Slices the last 3 events from the array
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const fetchAchievements = async () => {
            try {
                const response = await fetch('http://localhost:8080/achievement/getall', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include Bearer token
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                // Get the last 3 achievements
                setAchievements(data.slice(-3)); // Slices the last 3 achievements from the array
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        // Call fetch functions
        fetchTextPosts();
        fetchEvents();
        fetchAchievements();
    }, [token]); // Re-fetch if the token changes

    const handleLike = async (postId) => {
        try {
          const response = await fetch(`http://localhost:8080/textPost/like/${postId}`, {
            method: "POST",
            headers: {
             "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log("postId", postId);
          if (!response.ok) {
            throw new Error("Failed to like the post");
          }
    
          // Update the like counter in the UI after a successful response
          setTextPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, likeCounter: post.likeCounter + 1 } : post
            )
          );
        } catch (err) {
          console.error(err.message);
        }
      };


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
        <div className="homepage">
            <TitleBar />
            <hr />
            <main className="homepage-main">
                {/* Text Posts Section */}
                <section className="text-posts">
                    <h2>Text Posts</h2>
                    <div className="posts-container">
                        {textPosts.length > 0 ? (
                            textPosts.map((post, index) => (
                                <div key={index} className="post">
                                    <h3><strong><a href={`ViewProfilePage/${post.user.email}`}>{post.user.firstName}:</a></strong> {post.textContent}</h3>
                                    <div> 
                                    <h4>Likes: {post.likeCounter}</h4>
                                    <button onClick={() => handleLike(post.id)}>Like</button>
            
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No text posts available.</p>
                        )}
                    </div>
                    {/* Button to navigate to All Text Posts */}
                    <Link to="/AllTextPosts">
                        <button className="view-all-button">View All Text Posts</button>
                    </Link>
                </section>

                {/* Events Section */}
                <section className="events">
                    <h2>Upcoming Events</h2>
                    <div className="events-container">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <div key={index} className="event">
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    <p><strong>Dates: </strong>{event.startDate} - {event.endDate}</p>
                                    <p><strong>Location: </strong> {event.location}</p>
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
                    {/* Button to navigate to All Events */}
                    <Link to="/AllEvents">
                        <button className="view-all-button">View All Events</button>
                    </Link>
                </section>

                {/* Achievements Section */}
                <section className="achievements">
                    <h2>Achievements</h2>
                    <div className="achievements-container">
                        {achievements.length > 0 ? (
                            achievements.map((achievement, index) => (
                                <div key={index} className="achievement">
                                    <h3><strong>{achievement.title} </strong>- <a href={`ViewProfilePage/${achievement.user.email}`}>{achievement.user.firstName} {achievement.user.lastName}</a></h3>
                                    <p>{achievement.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No achievements available.</p>
                        )}
                    </div>
                    {/* Button to navigate to All Achievements */}
                    <Link to="/AllAchievements">
                        <button className="view-all-button">View All Achievements</button>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default HomePage;