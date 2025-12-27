import "./FlightTicket.css";

export default function FlightTicket({
  flight,
  isAdmin,
  isSaved,
  onSave,
  onRemove,
  onEdit,
  onDelete,
}) {
  const statusClass = flight.status.toLowerCase().replace(" ", "-");

  return (
    <div className="ticket">
      <div className="ticket-left">
        <div className="flight-number">{flight.flight_number}</div>

        <div className="route">
          <span className="city">{flight.origin}</span>

          <div className="route-visual">
            <span className="plane takeoff">✈</span>
            <span className="route-line" />
            <span className="plane landing">✈</span>
          </div>

          <span className="city">{flight.destination}</span>
        </div>

        <div className="flight-meta">
          <span>{flight.flight_date}</span>
          <span>{flight.departure_time} → {flight.arrival_time}</span>
          <span>Terminal {flight.terminal} · Gate {flight.gate}</span>
        </div>

        <div className={`status ${statusClass}`}>{flight.status}</div>
      </div>

      <div className="ticket-right">
        {!isAdmin &&
          (isSaved ? (
            <button className="save-btn danger" onClick={onRemove}>
              Remove
            </button>
          ) : (
            <button className="save-btn" onClick={onSave}>
              Save
            </button>
          ))}

        {isAdmin && (
          <div className="admin-actions">
            <button className="admin-btn" onClick={onEdit}>
              Edit
            </button>
            <button className="admin-btn danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
