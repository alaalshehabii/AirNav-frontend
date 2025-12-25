import "./AdminDashboard.css";

export default function AdminDashboard() {
  // Fake analytics data (safe + professional)
  const stats = {
    totalFlights: 128,
    onTime: 76,
    delayed: 22,
    cancelled: 10,
    inAir: 20,
    totalFacilities: 18,
    savedFlights: 54,
  };

  return (
    <main className="page">
      <header className="page-header">
        <h1>Admin Overview</h1>
        <p className="muted">
          System statistics and airport activity overview.
        </p>
      </header>

      <section className="stats-grid">
        <StatCard title="Total Flights" value={stats.totalFlights} />
        <StatCard title="On Time Flights" value={stats.onTime} />
        <StatCard title="Delayed Flights" value={stats.delayed} />
        <StatCard title="Cancelled Flights" value={stats.cancelled} />
        <StatCard title="Flights In Air" value={stats.inAir} />
        <StatCard title="Facilities" value={stats.totalFacilities} />
        <StatCard title="Saved Flights" value={stats.savedFlights} />
      </section>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
}

