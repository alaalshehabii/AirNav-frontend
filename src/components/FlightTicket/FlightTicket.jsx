
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
          <span>{flight.origin}</span>
          <div className="plane-line" />
          <span>{flight.destination}</span>
        </div>

        <div className={`status ${statusClass}`}>{flight.status}</div>
      </div>

      <div className="ticket-right">
        {!isAdmin &&
          (isSaved ? (
            <button className="save-btn" onClick={onRemove}>Remove</button>
          ) : (
            <button className="save-btn" onClick={onSave}>Save</button>
          ))}

        {isAdmin && (
          <>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}


