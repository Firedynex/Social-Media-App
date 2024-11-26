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

    return (
        <div>
            <TitleBar />
        <div className="all-text-posts-page">
            <h1>All Text Posts</h1>
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
        </div>
        </div>
    );
};

export default AllTextPostsPage;