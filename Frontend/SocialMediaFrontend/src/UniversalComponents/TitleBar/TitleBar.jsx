import './TitleBar.css';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function TitleBar() {
  const navigate = useNavigate(); // Call useNavigate directly here

  // Handle logout
  function doLogout() {
    const token = Cookies.get('jwtToken');
    navigate('/'); // Navigate to the homepage
    Cookies.remove('jwtToken'); // Correctly remove the token
  }

  return (
    <div className="title-bar">
      <div className="title-left">
        <a href="/HomePage">
          <img src="../circlLogo.png" alt="Circl Logo" />
        </a>
        <a id="title-name" href="/HomePage">
          Circl
        </a>
      </div>


      <div className="title-center">
        <div className="plus-button">
          +
          <div className="dropdown">
            <a href="/CreateTextPost">Post</a>
            <a href="/CreateEvent">Event</a>
            <a href="/create-achievement">Achievement</a>
          </div>
        </div>
      </div>

      <div className="title-right">
        <div className="user-profile-button">
          <button onClick={() => navigate("/UserProfilePage")}>
          <FontAwesomeIcon icon={faUser} color="black" />
          </button>
        </div>
        <button className="logout-button" onClick={doLogout}>Logout</button>
      </div>
    </div>
  );
}
