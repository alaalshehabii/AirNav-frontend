
import { useContext, useEffect, useState } from "react";
import {
  FaSuitcase,
  FaPlaneDeparture,
  FaShieldAlt,
  FaDoorOpen,
  FaInfoCircle,
  FaExclamationTriangle,
  FaDoorClosed,
  FaTrash,
} from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import "./Guide.css";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function Guide() {
  const { user } = useContext(UserContext);

  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    category: "Gate",
    status: "Info",
    message: "",
  });

  const fetchNotices = async () => {
    const res = await fetch(`${BASE_URL}/notices`);
    const data = await res.json();
    setNotices(data || []);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/notices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ category: "Gate", status: "Info", message: "" });
    fetchNotices();
  };

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/notices/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchNotices();
  };

  return (
    <main className="page guide-page">
      {/* Guide */}
      <header className="guide-hero">
        <h1>Airport Guide</h1>
        <p>
          Everything you need to know to move through the airport smoothly and
          stress-free.
        </p>
      </header>

      {/* AIRPORT NOTICES  */}
      {(notices.length > 0 || user?.is_admin) && (
        <section className="notices">
          <h2>Airport Notices</h2>
          <p className="muted">
            Important updates provided by airport staff.
          </p>

          {user?.is_admin && (
            <form className="notice-form" onSubmit={handleAdd}>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option>Gate</option>
                <option>Security</option>
                <option>Facility</option>
                <option>Update</option>
              </select>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option>Info</option>
                <option>Warning</option>
                <option>Closed</option>
              </select>

              <input
                placeholder="Write a short notice"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />

              <button>Add</button>
            </form>
          )}

          <div className="notice-grid">
            {notices.map((n) => (
              <div
                key={n.id}
                className={`notice-card ${n.status.toLowerCase()}`}
              >
                <div className="notice-head">
                  <span className="badge">{n.category}</span>
                  <span className="badge status">
                    {n.status === "Info" && <FaInfoCircle />}
                    {n.status === "Warning" && <FaExclamationTriangle />}
                    {n.status === "Closed" && <FaDoorClosed />}
                    {n.status}
                  </span>

                  {user?.is_admin && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(n.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <p>{n.message}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* JOURNEY (2x2) */}
      <section className="journey">
        <h2>Your Airport Journey</h2>

        <div className="journey-grid">
          <div className="journey-card">
            <FaSuitcase className="journey-icon" />
            <h3>Arrive Early</h3>
            <p>
              Reach the airport 2–3 hours before departure to avoid delays and
              check baggage requirements.
            </p>
          </div>

          <div className="journey-card">
            <FaPlaneDeparture className="journey-icon" />
            <h3>Check-In</h3>
            <p>
              Confirm your flight details and drop off checked luggage if
              required.
            </p>
          </div>

          <div className="journey-card">
            <FaShieldAlt className="journey-icon" />
            <h3>Security</h3>
            <p>
              Prepare liquids and electronics in advance for security screening.
            </p>
          </div>

          <div className="journey-card">
            <FaDoorOpen className="journey-icon" />
            <h3>Boarding</h3>
            <p>
              Follow boarding announcements and proceed to your gate on time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

