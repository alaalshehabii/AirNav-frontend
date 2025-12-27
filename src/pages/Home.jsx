import PlaneDivider from "../components/UI/PlaneDivider";

export default function Home() {
  return (
    <main className="page home">
      <section className="home-hero">
        <h1>Welcome to AirNav</h1>

        <PlaneDivider />

        <p className="home-subtitle">
          AirNav makes traveling easier by helping you explore flights,
          follow their status in real time, and navigate the airport smoothly,
          all from one simple place.
        </p>
      </section>

      <section className="home-cards">
        <div className="home-card">
          <h3>Browse Flights</h3>
          <p>
            View available flights with clear routes, flight numbers,
            timings, and up to date statuses.
          </p>
        </div>

        <div className="home-card">
          <h3>Track Flight Status</h3>
          <p>
            Instantly check whether a flight is on time, boarding,
            delayed, in air, or has landed.
          </p>
        </div>

        <div className="home-card">
          <h3>Airport Facilities</h3>
          <p>
            Discover restaurants, cafés, shops, lounges, and essential
            services available inside the airport.
          </p>
        </div>

        <div className="home-card">
          <h3>Airport Guide</h3>
          <p>
            Get helpful tips, notices, and guidance to move through
            the airport smoothly and stress free.
          </p>
        </div>
      </section>
    </main>
  );
}

