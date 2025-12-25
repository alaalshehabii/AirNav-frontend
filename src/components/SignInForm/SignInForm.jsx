import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import PlaneDivider from "../UI/PlaneDivider";
import "../Auth/Auth.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message || "Sign in failed");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to track flights and manage your trips
        </p>

        <PlaneDivider />

        {message && <p className="error-text">{message}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-actions">
            <button className="auth-primary" type="submit">
              Sign In
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

export default SignInForm;

