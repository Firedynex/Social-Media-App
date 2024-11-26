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
                                    <p><strong>{post.user.firstName}:</strong> {post.textContent}</p>
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
                                    <h3><strong>{achievement.title} </strong>- {achievement.user.firstName} {achievement.user.lastName}</h3>
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