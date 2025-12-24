import { useEffect, useState } from "react";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/facilities")
      .then(res => res.json())
      .then(data => setFacilities(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Facilities</h1>

      {facilities.length === 0 ? (
        <p>No facilities available</p>
      ) : (
        <ul>
          {facilities.map(facility => (
            <li key={facility.id}>
              <strong>{facility.name}</strong> ({facility.type})<br />
              Terminal: {facility.terminal}<br />
              Location: {facility.location_description}<br />
              Hours: {facility.opening_hours}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

