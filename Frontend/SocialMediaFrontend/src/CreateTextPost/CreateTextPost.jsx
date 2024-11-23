import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import './CreateTextPost.css';

const TextPostForm = () => {
    const [textPost, setTextPost] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router navigation

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
            const response = await fetch('http://localhost:8080/TextPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: textPost }), // Send text post content to the backend
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