import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Flights() {
  const { user } = useContext(UserContext);

  const [flights, setFlights] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    flight_number: "",
    origin: "",
    destination: "",
    status: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = () => {
    fetch("http://127.0.0.1:8000/api/flights")
      .then(res => res.json())
      .then(data => setFlights(data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://127.0.0.1:8000/api/flights/${editingId}`
      : "http://127.0.0.1:8000/api/flights";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      fetchFlights();
      setEditingId(null);
      setFormData({
        flight_number: "",
        origin: "",
        destination: "",
        status: "",
      });
    });
  };

  const startEdit = (flight) => {
    setEditingId(flight.id);
    setFormData(flight);
  };

  const deleteFlight = (id) => {
    fetch(`http://127.0.0.1:8000/api/flights/${id}`, {
      method: "DELETE",
    }).then(() => fetchFlights());
  };

  return (
    <div>
      <h1>Flights</h1>

      {user?.role === "admin" && (
        <>
          <h2>{editingId ? "Edit Flight" : "Add Flight"}</h2>
          <form onSubmit={handleSubmit}>
            <input name="flight_number" placeholder="Flight Number" value={formData.flight_number} onChange={handleChange} required />
            <input name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} required />
            <input name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
            <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
            <button type="submit">{editingId ? "Update" : "Add"}</button>
          </form>
          <hr />
        </>
      )}

      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            <strong>{flight.flight_number}</strong> — {flight.origin} → {flight.destination} ({flight.status})
            {user?.role === "admin" && (
              <>
                <button onClick={() => startEdit(flight)}>Edit</button>
                <button onClick={() => deleteFlight(flight.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
