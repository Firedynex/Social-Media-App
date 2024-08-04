import React from 'react';
import './Achievement.css';

export default function Achievement() {
    return (
        <div className="container">
            <div className="header">
                <img src="path-to-your-image.jpg" alt="Achievement" />
                <h2>Personal Achievement</h2>
            </div>
            <form action="/submit-achievement" method="post">
                <label htmlFor="achievement-name">Achievement Name</label>
                <input type="text" id="achievement-name" name="achievementName" required />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="4" required></textarea>

                <div className="date-container">
                    <div>
                        <label htmlFor="date-start">Date Start</label>
                        <input type="date" id="date-start" name="dateStart" required />
                    </div>
                    <div>
                        <label htmlFor="date-end">Date End</label>
                        <input type="date" id="date-end" name="dateEnd" required />
                    </div>
                </div>

                <div className="btn-container">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}