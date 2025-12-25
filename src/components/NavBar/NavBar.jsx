import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./navbar.css";

export default function Navbar() {
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
        AirNav
      </Link>

      {/* Center links */}
      <div className="nav-center">
        <Link to="/flights">Flights</Link>
        {user && <Link to="/my-flights">My Flights</Link>}
      </div>

      {/* Right section */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome">
              Welcome, <strong>{user.username}</strong>
            </span>

            <button className="nav-signout" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/sign-in">Sign In</Link>
            <Link className="nav-link primary" to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

