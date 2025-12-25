import { useEffect, useState } from "react";
import FlightTicket from "../components/FlightTicket/FlightTicket";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function MyFlights() {
  const [flights, setFlights] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMyFlights();
  }, []);

  const fetchMyFlights = async () => {
    const res = await fetch(`${BASE_URL}/my-flights`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setFlights(data);
  };

  const removeFlight = async (id) => {
    await fetch(`${BASE_URL}/my-flights/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFlights(flights.filter((f) => f.id !== id));
  };

  return (
    <main>
      <h1>My Flights</h1>

      {flights.length === 0 && <p>No saved flights yet.</p>}

      <div>
        {flights.map((flight) => (
          <FlightTicket
            key={flight.id}
            flight={flight}
            isSaved={true}
            onRemove={() => removeFlight(flight.id)}
          />
        ))}
      </div>
    </main>
  );
}
