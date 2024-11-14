import TitleBar from "../UniversalComponents/TitleBar/TitleBar.jsx";
import { useNavigate } from 'react-router-dom';
import './MovieListPage.css'; 

export default function MovieListPage() {
    const navigate = useNavigate();

    const goToEventCreator = () => {
        navigate('/eventCreator');
    };

    const goToListCreator = () => {
        navigate('/listCreator');
    };
    
    return (
        <>
            <div className="navigate-buttons">
                <button onClick={goToEventCreator}>Event Creator</button>
                <button onClick={goToListCreator}>List Creator</button>
            </div>
            <TitleBar />
            <div className="movie-list-page">
                <div className="page-header">
                    <h1>Movie List Name</h1> 
                </div>

                <button>Edit</button>
                <button>Share</button>

                <div className="text-boxes"> {/* need the text to put here */}
                    <label htmlFor="about">About</label>
                    <textarea id="about" name="about" rows="4" required></textarea>
                    <label htmlFor="list">List</label>
                    <textarea id="list" name="list" rows="4" required></textarea>
                </div>

                <div className="bottom-buttons">
                    <button>Create Poll</button>
                    <button>Like</button>
                    <button>Dislike</button>
                    <button>Comment</button>
                </div>

                <div className="comment-section">
                    {/* comments left by users go here */}
                </div>
            </div>
        </>
    );
}
