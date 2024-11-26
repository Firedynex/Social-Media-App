// import React from "react";
// import "./UserProfile.css";
// import { useParams } from "react-router-dom";

// // Card Component
// const Card = ({ title, description }) => {
//   return (
//     <div className="card">
//       <h3 className="card-title">{title}</h3>
//       <p className="card-description">{description}</p>
//     </div>
//   );
// };

// // Main UserProfile Component
// const UserProfile = () => {
//   // Sample Data
//   const posts = [
//     { title: "Post 1", description: "Excited about React!" },
//     { title: "Post 2", description: "Learned about Next.js today." },
//     { title: "Post 3", description: "Exploring GraphQL." },
//   ];

//   const achievements = [
//     { title: "🏆 100 Coding Challenges", description: "Completed 100 coding challenges on LeetCode." },
//     { title: "🏆 Top Contributor", description: "Awarded for top contributions on GitHub." },
//     { title: "🏆 Speaker", description: "Speaker at Tech Conference 2023." },
//   ];

//   const events = [
//     { title: "🚀 React Summit 2024", description: "Attending React Summit in Amsterdam." },
//     { title: "📅 JavaScript Workshop", description: "Hosted a JavaScript basics workshop." },
//     { title: "🎉 Full-Stack Expo", description: "Speaker at Full-Stack Expo." },
//   ];

//   return (
//     <div className="user-profile">
//       {/* Profile Header */}
//       <div className="profile-header">
//         <div className="profile-info">
//           <img
//             src="https://via.placeholder.com/150"
//             alt="User Avatar"
//             className="profile-avatar"
//           />
//           <div>
//             <h1 className="profile-name">John Doe</h1>
//             <p className="profile-bio">Software Engineer | Tech Enthusiast</p>
//           </div>
//         </div>
//         <button className="follow-button">Follow</button>
//       </div>

//       {/* Posts Section */}
//       <div className="profile-section">
//         <h2>Posts</h2>
//         <div className="card-container">
//           {posts.map((post, index) => (
//             <Card key={index} title={post.title} description={post.description} />
//           ))}
//         </div>
//       </div>

//       {/* Achievements Section */}
//       <div className="profile-section">
//         <h2>Achievements</h2>
//         <div className="card-container">
//           {achievements.map((achievement, index) => (
//             <Card key={index} title={achievement.title} description={achievement.description} />
//           ))}
//         </div>
//       </div>

//       {/* Events Section */}
//       <div className="profile-section">
//         <h2>Events</h2>
//         <div className="card-container">
//           {events.map((event, index) => (
//             <Card key={index} title={event.title} description={event.description} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UserProfile = () => {
  const { email } = useParams(); // Get username from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from backend using the username
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('jwtToken');
        console.log(token);
        const response = await fetch(`http://localhost:8080/user/user@example.com`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>User not found</p>;
  }

  //console.log(userData);

  return (
    <div>
      {/* /* <h1>{userData.name}'s Profile</h1>
      <p>Username: {userData.username}</p>
      <p>Bio: {userData.bio}</p>
      Render more user details as needed */}
    </div>
  );
};

export default UserProfile;

