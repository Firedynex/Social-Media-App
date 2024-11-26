import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import './CreateTextPost.css';
import {jwtDecode }from "jwt-decode"; // Correctly imported as default
import Cookies from "js-cookie";

const TextPostForm = () => {
    const [textPost, setTextPost] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router navigation
    const token = Cookies.get('jwtToken');
    const decodedToken = jwtDecode(token);
    const email = decodedToken.sub;

    const handleChange = (e) => {
        setTextPost(e.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!textPost.trim()) {
            alert('Please enter some text for your post.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/textPost', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    content: textPost,
                    email: email

                 }), // Send text post content to the backend
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                navigate('/HomePage'); // Navigate to the homepage upon success
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error during post creation:', error);
            alert('An error occurred while creating the post. Please try again.');
        }
    };

    return (
        <div className="text-post-form">
            <h1>Create a Text Post</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleCreate}>
                {/* Text Area Field */}
                <div className="form-group">
                    <label htmlFor="textPost">Post Content</label>
                    <textarea
                        id="textPost"
                        name="textPost"
                        rows="6"
                        placeholder="Write your text post here..."
                        value={textPost}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TextPostForm;