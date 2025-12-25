
import PlaneDivider from "../components/UI/PlaneDivider";

export default function Home() {
  return (
    <main className="page home">
      <section className="home-hero">
        <h1>Welcome to AirNav</h1>

        <PlaneDivider />

        <p className="home-subtitle">
          AirNav helps you browse flights, track their status in real time,
          and save your trips — all in one clean and simple dashboard.
        </p>
      </section>

      <section className="home-cards">
        <div className="home-card">
          <h3>Browse Flights</h3>
          <p>
            View available flights with clear routes, flight numbers,
            and up-to-date statuses.
          </p>
        </div>

        <div className="home-card">
          <h3>Track Status</h3>
          <p>
            Instantly see whether a flight is On Time, Boarding,
            Delayed, In Air, or Landed.
          </p>
        </div>

        <div className="home-card">
          <h3>Save Your Trips</h3>
          <p>
            Save important flights to your personal list and access
            them anytime from My Flights.
          </p>
        </div>

        <div className="home-card">
          <h3>Admin Management</h3>
          <p>
            Administrators can add, edit, and manage flights
            to keep information accurate and reliable.
          </p>
        </div>
      </section>
    </main>
  );
}
