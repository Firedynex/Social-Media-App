import React, { useEffect, useState } from 'react';
import './AllTextPosts.css'; // Importing styles
import Cookies from 'js-cookie'; // Importing cookies to retrieve the token
import TitleBar from '../UniversalComponents/TitleBar/TitleBar';

const AllTextPostsPage = () => {
    const [textPosts, setTextPosts] = useState([]);
    const token = Cookies.get('jwtToken'); // Retrieve the token from cookies

    // Fetch all text posts when the component mounts
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
                setTextPosts(data); // Store all the text posts in state
            } catch (error) {
                console.error('Error fetching text posts:', error);
            }
        };

        fetchTextPosts();
    }, [token]);
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

    return (
        <div>
            <TitleBar />
        <div className="all-text-posts-page">
            <h1>All Text Posts</h1>
            <div className="posts-container">
            {textPosts.length > 0 ? (
                            textPosts.map((post, index) => (
                                <div key={index} className="post">
                                    <h3><strong><a href={`/ViewProfilePage/${post.email}`}>{post.firstName}</a>:</strong> {post.content}</h3>
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
        </div>
        </div>
    );
};

export default AllTextPostsPage;