import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

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
    <main>
      <h1>Sign Up</h1>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input name="username" value={username} onChange={handleChange} />
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            name="passwordConf"
            type="password"
            value={passwordConf}
            onChange={handleChange}
          />
        </div>

        <button disabled={isFormInvalid() || loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </main>
  );
};

export default SignUpForm;
