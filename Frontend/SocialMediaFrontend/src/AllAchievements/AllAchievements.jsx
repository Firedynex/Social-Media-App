import React, { useEffect, useState } from 'react';
import './AllAchievements.css'; // Importing styles
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';
const AllAchievementsPage = () => {
    const [achievements, setAchievements] = useState([]);
    const token = Cookies.get('jwtToken'); // Retrieve the token from cookies

    // Fetch all achievements when the component mounts
    useEffect(() => {
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
                setAchievements(data); // Store all the achievements in state
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchAchievements();
    }, [token]);

    return (
        <div>
            <TitleBar />
        <div className="all-achievements-page">
            <h1>All Achievements</h1>
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
        </div>
        </div>
    );
};

export default AllAchievementsPage;