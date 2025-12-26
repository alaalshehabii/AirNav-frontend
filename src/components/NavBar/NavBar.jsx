
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FaPlaneDeparture } from "react-icons/fa";
import "./NavBar.css";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <FaPlaneDeparture className="logo-icon" />
        AirNav
      </Link>

      {/* Center navigation */}
      <div className="nav-center">
        {user && (
          <>
            <Link to="/flights" className="nav-link">Flights</Link>

            {!user.is_admin && (
              <Link to="/my-flights" className="nav-link">My Flights</Link>
            )}

            <Link to="/facilities" className="nav-link">Facilities</Link>
            <Link to="/guide" className="nav-link">Guide</Link>

            {user.is_admin && (
              <Link to="/admin" className="nav-link admin-link">Admin</Link>
            )}
          </>
        )}
      </div>

      {/* Right side */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome-text">
              Welcome, <strong>{user.username}</strong>
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="nav-link">Sign In</Link>
            <Link to="/sign-up" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
