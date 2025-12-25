
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
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
        AirNav
      </Link>

      {/* Center navigation */}
      <div className="nav-center">
        {user && (
          <>
            {/* Flights: everyone */}
            <Link to="/flights" className="nav-link">
              Flights
            </Link>

            {/* My Flights: NORMAL USERS ONLY */}
            {!user.is_admin && (
              <Link to="/my-flights" className="nav-link">
                My Flights
              </Link>
            )}

            {/* Facilities: everyone */}
            <Link to="/facilities" className="nav-link">
              Facilities
            </Link>

            {/* Admin: ADMIN ONLY */}
            {user.is_admin && (
              <Link to="/admin" className="nav-link admin-link">
                Admin
              </Link>
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
            <Link to="/sign-in" className="nav-link">
              Sign In
            </Link>

            <Link to="/sign-up" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}