import {
  FaSuitcaseRolling,
  FaPlaneDeparture,
  FaShieldAlt,
  FaPlaneArrival,
  FaMapSigns,
  FaCoffee,
} from "react-icons/fa";
import "./Guide.css";

export default function Guide() {
  return (
    <main className="page guide-page">
      {/* HERO */}
      <header className="guide-hero">
        <h1>Airport Guide</h1>
        <p>
          A simple guide to help you move through the airport smoothly, from arrival to landing.
        </p>
      </header>

      {/* TIMELINE */}
      <section className="timeline">
        <h2>Your Airport Journey</h2>

        <div className="timeline-track">
          <div className="timeline-step">
            <FaSuitcaseRolling />
            <h4>Arrive Early</h4>
            <p>Reach the airport 2–3 hours before departure.</p>
          </div>

          <div className="timeline-step">
            <FaPlaneDeparture />
            <h4>Check-In</h4>
            <p>Confirm your flight and drop off checked luggage.</p>
          </div>

          <div className="timeline-step">
            <FaShieldAlt />
            <h4>Security</h4>
            <p>Prepare liquids and electronics for screening.</p>
          </div>

          <div className="timeline-step">
            <FaMapSigns />
            <h4>Boarding Gate</h4>
            <p>Follow signs and wait for boarding announcements.</p>
          </div>

          <div className="timeline-step">
            <FaPlaneArrival />
            <h4>Arrival</h4>
            <p>Collect baggage and exit through arrivals.</p>
          </div>
        </div>
      </section>

      {/* EXTRA HELP */}
      <section className="guide-extra">
        <div className="extra-card">
          <FaCoffee />
          <h3>Use Airport Facilities</h3>
          <p>
            Relax at cafés, withdraw cash from ATMs, visit prayer rooms,
            or get medical help if needed.
          </p>
        </div>

        <div className="extra-card">
          <FaMapSigns />
          <h3>Follow Airport Signs</h3>
          <p>
            Terminals and gates may change, so always check airport screens.
          </p>
        </div>
      </section>
    </main>
  );
}