
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

export default function Navbar() {
  const { user, setUser, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <nav className="navbar">
      {/* Logo ALWAYS home */}
      <Link to="/" className="logo">AirNav</Link>

      <div className="nav-center">
        <Link to="/flights" className="nav-link">Flights</Link>

        {/* 👇 NORMAL USERS ONLY */}
        {user && !isAdmin && (
          <Link to="/my-flights" className="nav-link">My Flights</Link>
        )}
      </div>

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


