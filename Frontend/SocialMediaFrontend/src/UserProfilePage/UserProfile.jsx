import React from "react";
import "./UserProfile.css";

const UserProfile = () => {

    posts = [["user1", "had my first internship!"],["user1", "graduated today"], ["user1", "got a master's degree today"]];
    achievements = []

  return (
    <div className="user-profile">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="profile-avatar"
          />
          <div>
            <h1 className="profile-name">John Doe</h1>
            <p className="profile-bio">Software Engineer | Tech Enthusiast</p>
          </div>
        </div>
        <button className="follow-button">Follow</button>
      </div>

      {/* Posts Section */}
      <div className="profile-section">
        <h2>Posts</h2>
        <ul className="posts-list">
          <li>Post 1: Excited about React!</li>
          <li>Post 2: Learned about Next.js today.</li>
          <li>Post 3: Exploring GraphQL.</li>
        </ul>
      </div>

      {/* Achievements Section */}
      <div className="profile-section">
        <h2>Achievements</h2>
        <ul className="achievements-list">
          <li>🏆 Completed 100 coding challenges</li>
          <li>🏆 Top Contributor Award on GitHub</li>
          <li>🏆 Speaker at Tech Conference 2023</li>
        </ul>
      </div>

      {/* Events Section */}
      <div className="profile-section">
        <h2>Events</h2>
        <ul className="events-list">
          <li>🚀 Attending: React Summit 2024</li>
          <li>📅 Hosted: JavaScript Workshop</li>
          <li>🎉 Speaker at: Full-Stack Expo</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
