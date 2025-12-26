import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FacilityCard from "../components/FacilityCard/FacilityCard";
import "./Facilities.css";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function Facilities() {
  const { user } = useContext(UserContext);

  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    type: "",
    terminal: "",
    location_description: "",
  });

  const fetchFacilities = async () => {
    const res = await fetch(`${BASE_URL}/facilities`);
    const data = await res.json();
    setFacilities(data);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      const matchesName = f.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || f.type === typeFilter;
      return matchesName && matchesType;
    });
  }, [facilities, search, typeFilter]);

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch(`${BASE_URL}/facilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      type: "",
      terminal: "",
      location_description: "",
    });

    fetchFacilities();
  };

  const handleUpdate = async (id, data) => {
    await fetch(`${BASE_URL}/facilities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    fetchFacilities();
  };

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/facilities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchFacilities();
  };

  return (
    <div className="fac-page">
      <h1>Airport Facilities</h1>

      {!user?.is_admin && (
        <div className="fac-toolbar">
          <input
            placeholder="Search facilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All types</option>
            <option value="Cafe">Cafe</option>
            <option value="Shop">Shop</option>
            <option value="Prayer Room">Prayer Room</option>
            <option value="ATM">ATM</option>
            <option value="Medical">Medical</option>
          </select>
        </div>
      )}

      {user?.is_admin && (
        <form className="fac-admin" onSubmit={handleAdd}>
          <h2>Add Facility</h2>

          <input
            placeholder="Facility name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Select type</option>
            <option value="Cafe">Cafe</option>
            <option value="Shop">Shop</option>
            <option value="Prayer Room">Prayer Room</option>
            <option value="ATM">ATM</option>
            <option value="Medical">Medical</option>
          </select>

          <input
            placeholder="Terminal (e.g. T1)"
            value={form.terminal}
            onChange={(e) => setForm({ ...form, terminal: e.target.value })}
            required
          />

          <input
            placeholder="Location (e.g. Near Gate 2)"
            value={form.location_description}
            onChange={(e) =>
              setForm({ ...form, location_description: e.target.value })
            }
            required
          />

          <button type="submit">Add Facility</button>
        </form>
      )}

      <div className="fac-grid">
        {filtered.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            isAdmin={user?.is_admin}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

