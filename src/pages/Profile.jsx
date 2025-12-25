import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROFILE
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        setUser({ ...user, ...formData });
        alert("Profile updated successfully");
      });
  };

  // DELETE ACCOUNT
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    fetch("http://127.0.0.1:8000/api/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/";
    });
  };

  return (
    <div>
      <h1>My Profile</h1>

      <form onSubmit={handleUpdate}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
}
