import React from "react";
import { useNavigate } from "react-router-dom";

const TestHomePage = () => {
  // Sample posts data
  const posts = [
    { id: 1, content: "Learning React is fun!", email: "user@example.com" },
    { id: 2, content: "Next.js is powerful!", email: "jane_smith" },
  ];

  const navigate = useNavigate();

  const handleRedirect = (email) => {
    // Redirect to the user's profile page
    navigate(`/UserProfilePage/${email}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>{post.content}</p>
            <button onClick={() => handleRedirect(post.email)}>
              Posted by: {post.email}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHomePage;
