
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import FlightTicket from "../components/FlightTicket/FlightTicket";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function Flights() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [flights, setFlights] = useState([]);
  const [myFlights, setMyFlights] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    flight_number: "",
    origin: "",
    destination: "",
    status: "",
  });

  useEffect(() => {
    fetchFlights();
    if (user) fetchMyFlights();
  }, [user]);

  const fetchFlights = async () => {
    setError("");
    const res = await fetch(`${BASE_URL}/flights`);
    if (!res.ok) {
      setFlights([]);
      setError("Could not load flights.");
      return;
    }
    const data = await res.json();
    setFlights(Array.isArray(data) ? data : []);
  };

  const fetchMyFlights = async () => {
    const res = await fetch(`${BASE_URL}/my-flights`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setMyFlights([]);
      return;
    }
    const data = await res.json();
    setMyFlights(Array.isArray(data) ? data : []);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${BASE_URL}/flights/${editingId}`
      : `${BASE_URL}/flights`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    setEditingId(null);
    setFormData({
      flight_number: "",
      origin: "",
      destination: "",
      status: "",
    });
    fetchFlights();
  };

  const startEdit = (flight) => {
    setEditingId(flight.id);
    setFormData({
      flight_number: flight.flight_number,
      origin: flight.origin,
      destination: flight.destination,
      status: flight.status,
    });
  };

  const deleteFlight = async (id) => {
    await fetch(`${BASE_URL}/flights/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchFlights();
  };

  const saveFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMyFlights();
  };

  const removeFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMyFlights();
  };

  const isSaved = (id) => myFlights.some((f) => f.id === id);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Flights</h1>
        <p className="muted">
          Browse flights and save tickets to My Flights.
        </p>
      </header>

      {error && <p className="error">{error}</p>}

      {/* ADMIN ADD / EDIT FLIGHT */}
      {user?.is_admin && (
        <section className="add-flight-wrapper">
          <h3>{editingId ? "Edit Flight" : "Add Flight"}</h3>

          <form className="add-flight-form" onSubmit={handleSubmit}>
            <input
              name="flight_number"
              placeholder="Flight Number"
              value={formData.flight_number}
              onChange={handleChange}
              required
            />

            <input
              name="origin"
              placeholder="Origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />

            <input
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />

            <input
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              required
            />

            <button className="add-flight-btn">
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </section>
      )}

      {/* FLIGHTS GRID */}
      <div className="tickets-grid">
        {flights.map((flight) => (
          <FlightTicket
            key={flight.id}
            flight={flight}
            isAdmin={user?.is_admin}
            isSaved={isSaved(flight.id)}
            onSave={() => saveFlight(flight.id)}
            onRemove={() => removeFlight(flight.id)}
            onEdit={() => startEdit(flight)}
            onDelete={() => deleteFlight(flight.id)}
          />
        ))}
      </div>
    </main>
  );
}

