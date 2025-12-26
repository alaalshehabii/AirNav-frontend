import { useMemo, useState } from "react";
import {
  FaCoffee,
  FaShoppingBag,
  FaMosque,
  FaMoneyBillWave,
  FaBriefcaseMedical,
} from "react-icons/fa";
import "./FacilityCard.css";

const TYPE_ICONS = {
  Cafe: FaCoffee,
  Shop: FaShoppingBag,
  "Prayer Room": FaMosque,
  ATM: FaMoneyBillWave,
  Medical: FaBriefcaseMedical,
};

export default function FacilityCard({ facility, isAdmin, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: facility.name,
    type: facility.type,
    terminal: facility.terminal,
    location_description: facility.location_description,
  });

  const Icon = useMemo(
    () => TYPE_ICONS[facility.type] || FaCoffee,
    [facility.type]
  );

  const handleSave = () => {
    onUpdate(facility.id, {
      name: form.name.trim(),
      type: form.type,
      terminal: form.terminal.trim(),
      location_description: form.location_description.trim(),
    });
    setEditing(false);
  };

  return (
    <div className="fac-card">
      <div className="fac-card-top">
        <div className="fac-icon">
          <Icon />
        </div>

        {editing ? (
          <input
            className="fac-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        ) : (
          <h3>{facility.name}</h3>
        )}
      </div>

      {editing ? (
        <>
          <select
            className="fac-select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="Cafe">Cafe</option>
            <option value="Shop">Shop</option>
            <option value="Prayer Room">Prayer Room</option>
            <option value="ATM">ATM</option>
            <option value="Medical">Medical</option>
          </select>

          <input
            className="fac-input"
            value={form.terminal}
            onChange={(e) => setForm({ ...form, terminal: e.target.value })}
            placeholder="Terminal"
          />

          <input
            className="fac-input"
            value={form.location_description}
            onChange={(e) =>
              setForm({ ...form, location_description: e.target.value })
            }
            placeholder="Location"
          />
        </>
      ) : (
        <>
          <span className="fac-type">{facility.type}</span>
          <p className="fac-terminal">Terminal {facility.terminal}</p>
          <p className="fac-location">{facility.location_description}</p>
        </>
      )}

      {isAdmin && (
        <div className="fac-actions">
          {editing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button className="ghost" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button className="danger" onClick={() => onDelete(facility.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

