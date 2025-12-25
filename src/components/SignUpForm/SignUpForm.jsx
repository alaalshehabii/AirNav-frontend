
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import PlaneDivider from "../UI/PlaneDivider";
import "../Auth/Auth.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const { username, email, password, passwordConf } = formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = await signUp({ username, email, password });
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(
        err.message === "Failed to fetch"
          ? "Backend server is not running"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = () =>
    !(username && email && password && password === passwordConf);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join AirNav and manage flights effortlessly
        </p>

        <PlaneDivider />

        {message && <p className="error-text">{message}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input name="username" value={username} onChange={handleChange} />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
            />
          </div>

          <div className="auth-actions">
            <button
              className="auth-primary"
              disabled={isFormInvalid() || loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <button
              className="auth-secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;

