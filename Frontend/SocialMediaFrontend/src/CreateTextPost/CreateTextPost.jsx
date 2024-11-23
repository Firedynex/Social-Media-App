import "./CreateTextPost.css";


export default function CreateTextPost() {
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/TextPost', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                navigate("/HomePage");
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    return (
        <div className="create-text-post">
            <textarea
                className="text-post-input"
                maxLength="280"
                placeholder="What's on your mind?"
            ></textarea>
            <button className="submit-post-button" onClick={handleCreate}>Post</button>
        </div>
    );
}