
export default function MovieListPage() {
    return (
        <>
            <div className="movie-list-page">
                <div className="page-header">
                    <p>Movie List Name</p> {/* change based on the actual name of the list */}
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
    )
}