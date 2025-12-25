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

  // ---------------- FETCH ALL FLIGHTS ----------------
  const fetchFlights = async () => {
    const res = await fetch(`${BASE_URL}/flights`);
    const data = await res.json();
    setFlights(data);
  };

  // ---------------- FETCH MY FLIGHTS ----------------
  const fetchMyFlights = async () => {
    const res = await fetch(`${BASE_URL}/my-flights`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMyFlights(data.map((f) => f.id));
  };

  // ---------------- FORM ----------------
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchFlights();
  };

  // ---------------- MY FLIGHTS ACTIONS ----------------
  const saveFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchMyFlights();
  };

  const removeFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchMyFlights();
  };

  return (
    <main>
      <h1>Flights</h1>

      {/* ================= ADMIN FORM ================= */}
      {user?.is_admin && (
        <>
          <h2>{editingId ? "Edit Flight" : "Add Flight"}</h2>

          <form onSubmit={handleSubmit}>
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

            <button type="submit">
              {editingId ? "Update Flight" : "Add Flight"}
            </button>
          </form>

          <hr />
        </>
      )}

      {/* ================= FLIGHT TICKETS ================= */}
      <div>
        {flights.map((flight) => (
          <FlightTicket
            key={flight.id}
            flight={flight}
            isAdmin={user?.is_admin}
            isSaved={myFlights.includes(flight.id)}
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
