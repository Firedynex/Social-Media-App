
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./UserProfile.css";
import TitleBar from "../UniversalComponents/TitleBar/TitleBar";


const UserProfile = () => {
  const { email } = useParams(); // Get username from the URL
  const [userData, setUserData] = useState(null);
  const [userPosts, setPostsData] = useState(null);
  const [userAchievements, setAchievementsData] = useState(null);
  const [userEvents, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from backend using the username
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('jwtToken');
        console.log(token)
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub

        const userResponse = await fetch(`http://localhost:8080/user/${email}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        //console.log(response)
        const userData = await userResponse.json();
        setUserData(userData);

        const postsResponse = await fetch(`http://localhost:8080/textPost/user/${email}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        //console.log(response)
        const postsData = await postsResponse.json();
        setPostsData(postsData);
        console.log(postsData)

        const achievementsResponse = await fetch(`http://localhost:8080/achievement/${email}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!achievementsResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        //console.log(response)
        const achievementsData = await achievementsResponse.json();
        setAchievementsData(achievementsData);
        console.log(achievementsData)

        const eventsResponse = await fetch(`http://localhost:8080/events/${email}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        //console.log(response)
        const eventsData = await eventsResponse.json();
        setEventsData(eventsData);
        console.log(eventsData)

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


  return (
    // <div>
    //   <h1>{userData.email}'s Profile</h1>
    //   <p>Username: {userData.firstName}</p>
    //   <p>Bio: {userData.lastName}</p>
    //   <div>
    //     {userPosts && userPosts.map((post, index) => (
    //         <div key={index}>
    //         <p>{post.content}</p>
    //         </div>
    //     ))}
    //     </div>
    //     <div>
    //         {userAchievements && userAchievements.map((achievement, index) => (
    //         <div key={index}>
    //         <p>{achievement.title}</p>
    //         <p>{achievement.description}</p>
    //         <p>{achievement.date}</p>
    //         </div>
    //     ))}
    //     </div>
    // </div>
    <>
    <TitleBar/>
    <div className="user-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          {/* <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="profile-avatar"
          /> */}
          <div>
            <h1 className="profile-name">{userData.firstName} {userData.lastName}'s Profile</h1>
            {/* <p className="profile-bio"></p> */}
          </div>
        </div>
        <button className="follow-button">Follow</button>
      </div>

      {/* Posts Section */}
      <div className="profile-section">
        <h2>Posts</h2>
        <div className="card-container">
          {userPosts && userPosts.map((post, index) => (
            <div key={index} className="card">
              <p className="card-description"><strong>You Said: </strong>{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="profile-section">
        <h2>Events</h2>
        <div className="card-container">
          {userEvents && userEvents.map((event, index) => (
            <div key={index} className="card">
              <h3 className="card-description">{event.title}</h3>
              <p className="card-description">{event.description}</p>
              <p className="card-description"><strong>Dates: </strong>{event.startDate} - {event.endDate}</p>
              <p className="card-description"><strong>Location: </strong>{event.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="profile-section">
        <h2>Achievements</h2>
        <div className="card-container">
          {userAchievements && userAchievements.map((achievement, index) => (
            <div key={index} className="card">
              <h3 className="card-title"><strong>{achievement.title}</strong></h3>
              <p className="card-description">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;