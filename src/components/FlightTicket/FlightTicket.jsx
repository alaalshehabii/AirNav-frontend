import {
  Plane,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Edit,
} from "lucide-react";
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
  return (
    <div className="ticket">
      {/* Left */}
      <div className="ticket-left">
        <span className="flight-number">{flight.flight_number}</span>

        <div className="route">
          <span className="city">{flight.origin}</span>

          <div className="plane-line">
            <Plane size={16} />
            <span className="line" />
          </div>

          <span className="city">{flight.destination}</span>
        </div>

        <span
          className={`status ${
            flight.status.toLowerCase().includes("delay")
              ? "delayed"
              : "on-time"
          }`}
        >
          {flight.status}
        </span>
      </div>

      {/* Right actions */}
      <div className="ticket-actions">
        {!isAdmin && (
          isSaved ? (
            <button className="icon-btn" onClick={onRemove}>
              <BookmarkCheck />
            </button>
          ) : (
            <button className="icon-btn" onClick={onSave}>
              <Bookmark />
            </button>
          )
        )}

        {isAdmin && (
          <>
            <button className="icon-btn" onClick={onEdit}>
              <Edit />
            </button>
            <button className="icon-btn danger" onClick={onDelete}>
              <Trash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
