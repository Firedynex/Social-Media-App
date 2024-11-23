import React from 'react';
import './HomePage.css'; // Importing styles
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const HomePage = () => {
    return (
        <div className="homepage">
            <TitleBar></TitleBar>
            <hr></hr>
            <main className="homepage-main">
                {/* Text Posts Section */}
                <section className="text-posts">
                    <h2>Text Posts</h2>
                    <div className="posts-container">
                        <div className="post">This is a sample post! 🎉</div>
                        <div className="post">Another exciting update from a user!</div>
                        <div className="post">What are your thoughts for today?</div>
                    </div>
                </section>

                {/* Events Section */}
                <section className="events">
                    <h2>Upcoming Events</h2>
                    <div className="events-container">
                        <div className="event">
                            <h3>Community Meetup</h3>
                            <p>Date: Nov 30, 2024</p>
                            <p>Location: UGA Campus</p>
                        </div>
                        <div className="event">
                            <h3>Tech Workshop</h3>
                            <p>Date: Dec 5, 2024</p>
                            <p>Location: Online</p>
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section className="achievements">
                    <h2>Achievements</h2>
                    <div className="achievements-container">
                        <div className="achievement">
                            <h3>100 Posts Milestone</h3>
                            <p>Congratulations to our users!</p>
                        </div>
                        <div className="achievement">
                            <h3>Top Contributor: Jane Doe</h3>
                            <p>Keep up the great work!</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;