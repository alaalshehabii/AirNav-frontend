import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Facilities() {
  const { user } = useContext(UserContext);

  const [facilities, setFacilities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    terminal: "",
    location_description: "",
    opening_hours: "",
  });

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = () => {
    fetch("http://127.0.0.1:8000/api/facilities")
      .then(res => res.json())
      .then(data => setFacilities(data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://127.0.0.1:8000/api/facilities/${editingId}`
      : "http://127.0.0.1:8000/api/facilities";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      fetchFacilities();
      setEditingId(null);
      setFormData({
        name: "",
        type: "",
        terminal: "",
        location_description: "",
        opening_hours: "",
      });
    });
  };

  const startEdit = (facility) => {
    setEditingId(facility.id);
    setFormData(facility);
  };

  const deleteFacility = (id) => {
    fetch(`http://127.0.0.1:8000/api/facilities/${id}`, {
      method: "DELETE",
    }).then(() => fetchFacilities());
  };

  return (
    <div>
      <h1>Facilities</h1>

      {user?.role === "admin" && (
        <>
          <h2>{editingId ? "Edit Facility" : "Add Facility"}</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
            <input name="terminal" placeholder="Terminal" value={formData.terminal} onChange={handleChange} required />
            <input name="location_description" placeholder="Location" value={formData.location_description} onChange={handleChange} required />
            <input name="opening_hours" placeholder="Hours" value={formData.opening_hours} onChange={handleChange} required />
            <button type="submit">{editingId ? "Update" : "Add"}</button>
          </form>
          <hr />
        </>
      )}

      <ul>
        {facilities.map(facility => (
          <li key={facility.id}>
            <strong>{facility.name}</strong> ({facility.type}) — {facility.terminal}
            {user?.role === "admin" && (
              <>
                <button onClick={() => startEdit(facility)}>Edit</button>
                <button onClick={() => deleteFacility(facility.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

