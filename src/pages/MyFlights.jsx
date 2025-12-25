import { useEffect, useState } from "react";
import FlightTicket from "../components/FlightTicket/FlightTicket";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function MyFlights() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyFlights();
    // eslint-disable-next-line
  }, []);

  const fetchMyFlights = async () => {
    setError("");

    const res = await fetch(`${BASE_URL}/my-flights`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFlights([]);
      setError(data.detail || "Could not load My Flights.");
      return;
    }

    const data = await res.json();
    setFlights(Array.isArray(data) ? data : []);
  };

  const removeFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <main className="page">
      <header className="page-header">
        <h1>My Flights</h1>
        <p className="muted">Your saved tickets will appear here.</p>
      </header>

      {error && <p className="error">{error}</p>}
      {flights.length === 0 && !error && <p className="muted">No saved flights yet.</p>}

      <div className="tickets">
        {flights.map((flight) => (
          <FlightTicket
            key={flight.id}
            flight={flight}
            isAdmin={false}
            isSaved={true}
            onRemove={() => removeFlight(flight.id)}
          />
        ))}
      </div>
    </main>
  );
}