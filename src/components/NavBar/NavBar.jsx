
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
      <Link to="/" className="logo">AirNav</Link>

      <div className="nav-center">
        <Link to="/flights">Flights</Link>
        {user && <Link to="/my-flights">My Flights</Link>}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span>Welcome, <strong>{user.username}</strong></span>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

