
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./ViewProfile.css";
import TitleBar from "../UniversalComponents/TitleBar/TitleBar";
//import { jwtDecode } from "jwt-decode";
//import Cookies from "js-cookie";


const ViewProfile = () => {
  const { email } = useParams(); // Get username from the URL
  const [userData, setUserData] = useState(null);
  const [userPosts, setPostsData] = useState(null);
  const [userAchievements, setAchievementsData] = useState(null);
  const [userEvents, setEventsData] = useState(null);
  const [userFollowers, setFollowersData] = useState(null);
  const [userFollowing, setFollowingData] = useState(null);
  const [myFollowings, setMyFollowingData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleClick = async () => {
    try {
        const token = Cookies.get("jwtToken");
        const decodedToken = jwtDecode(token);
        const myEmail = decodedToken.sub;

        if (flag) {
            // Unfollow logic
            const unfollowRes = await fetch(`http://localhost:8080/user/${myEmail}/unfollow/${email}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!unfollowRes.ok) {
                throw new Error("Failed to unfollow user");
            }

            // Optionally process the response
            const unfollow = await unfollowRes.json();
            console.log("Unfollowed successfully:", unfollow);
            setFlag(false);
        } else {
            // Follow logic
            const followRes = await fetch(`http://localhost:8080/user/${myEmail}/follow/${email}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!followRes.ok) {
                throw new Error("Failed to follow user");
            }

            // Optionally process the response
            const follow = await followRes.json();
            console.log("Followed successfully:", follow);
            setFlag(true);
        }
    } catch (err) {
        console.error("Error in follow/unfollow action:", err);
    }
};


  useEffect(() => {
    // Fetch user data from backend using the username
    const fetchUserData = async () => {
      try {

        const token = Cookies.get('jwtToken');
        console.log(token)
        const decodedToken = jwtDecode(token);
        const myEmail = decodedToken.sub

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

        const followersResponse = await fetch(`http://localhost:8080/user/getFollowers/${email}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // Add the Bearer token here
              "Content-Type": "application/json", // Optional, depending on your API
            },
          });
        if (!followersResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        //console.log(response)
        const followersData = await followersResponse.json();
        setFollowersData(followersData);
        console.log(followersData)
  
        const followingResponse = await fetch(`http://localhost:8080/user/getFollowing/${email}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Add the Bearer token here
            "Content-Type": "application/json", // Optional, depending on your API
          },
        });
      if (!followingResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      //console.log(response)
      const followingData = await followingResponse.json();
      setFollowingData(followingData);
      console.log(followingData)

      const myFollowingResponse = await fetch(`http://localhost:8080/user/getFollowing/${myEmail}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Add the Bearer token here
          "Content-Type": "application/json", // Optional, depending on your API
        },
      });
    if (!myFollowingResponse.ok) {
      throw new Error("Failed to fetch user data");
    }
    //console.log(response)
    const myFollowings = await myFollowingResponse.json();
    setMyFollowingData(myFollowings);
    console.log("who i am following as ", myEmail, myFollowings)

    myFollowings.map((following) => {
        if (following.email === email) {
            setFlag(true);
        }
    });

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
        <button className="follow-button" onClick={handleClick}>
            {flag ? "Unfollow" : "Follow"}
        </button>
      </div>

      {/* Posts Section */}
      <div className="profile-section">
        <h2>Posts</h2>
        <div className="card-container">
          {userPosts && userPosts.map((post, index) => (
            <div key={index} className="card">
              <p className="card-description"><strong>You Said: </strong>{post.content}</p>
              <div>
                <p>Likes: {post.likeCounter} </p>
               </div>
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

      <div className="profile-section">
        <h2>Followers</h2>
        <div className="card-container">
          {userFollowers && userFollowers.map((follower, index) => (
            <div key={index} className="card">
              <h3 className="card-description"><a href={`ViewProfilePage/${follower.email}`}>{follower.firstName} {follower.lastName}</a></h3>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2>Following</h2>
        <div className="card-container">
          {userFollowing && userFollowing.map((following, index) => (
            <div key={index} className="card">
              <h3 className="card-description"><a href={`ViewProfilePage/${following.email}`}>{following.firstName} {following.lastName}</a></h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewProfile;