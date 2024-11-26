import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Importing styles
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token

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
                setTextPosts(data);
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
                setEvents(data);
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
                setAchievements(data);
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
                                    {post.content}
                                </div>
                            ))
                        ) : (
                            <p>No text posts available.</p>
                        )}
                    </div>
                </section>

                {/* Events Section */}
                <section className="events">
                    <h2>Upcoming Events</h2>
                    <div className="events-container">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <div key={index} className="event">
                                    <h3>{event.title}</h3>
                                    <p>Date: {event.date}</p>
                                    <p>Location: {event.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No events available.</p>
                        )}
                    </div>
                </section>

                {/* Achievements Section */}
                <section className="achievements">
                    <h2>Achievements</h2>
                    <div className="achievements-container">
                        {achievements.length > 0 ? (
                            achievements.map((achievement, index) => (
                                <div key={index} className="achievement">
                                    <h3>{achievement.title}</h3>
                                    <p>{achievement.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No achievements available.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;