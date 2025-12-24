import { useEffect, useState } from "react";

export default function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flights")
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Flights</h1>

      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              {flight.flight_number} — {flight.origin} → {flight.destination} ({flight.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
