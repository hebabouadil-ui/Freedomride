import Link from "next/link";
import { defaultBookings, defaultBikes } from "@/lib/store";

const stats = [
  { label: "Total Bookings", value: "47", change: "+12 this month", color: "var(--color-gold)" },
  { label: "Active Rentals", value: "3", change: "Right now", color: "#6fcf97" },
  { label: "Revenue (MAD)", value: "18,450", change: "This month", color: "var(--color-gold)" },
  { label: "Bikes Available", value: "11 / 15", change: "4 currently out", color: "var(--color-sand)" },
];

const statusColors: Record<string, string> = {
  pending: "var(--color-gold)",
  confirmed: "#4a9edd",
  active: "#6fcf97",
  completed: "var(--color-muted)",
  cancelled: "var(--color-red)",
};

export default function AdminDashboard() {
  return (
    <div style={{ padding: "2.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--color-cream)",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
          Welcome back — here&apos;s what&apos;s happening at FreedomRide
        </p>
      </div>

      {/* Stats grid */}
      <div
        className="grid gap-4 mb-8"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="admin-card">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.75rem" }}>
              {s.label}
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.4rem" }}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-cream)" }}>
              Recent Bookings
            </h2>
            <Link
              href="/admin/bookings"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-gold)", textDecoration: "none" }}
            >
              View all →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {defaultBookings.map((b) => (
              <div
                key={b.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  background: "rgba(255,248,237,0.04)",
                  borderRadius: "8px",
                  gap: "0.75rem",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-cream)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {b.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                    {b.pickupDate} → {b.returnDate} · {b.bikeType}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span
                    className="status-badge"
                    style={{
                      background: `${statusColors[b.status]}18`,
                      color: statusColors[b.status],
                      border: `1px solid ${statusColors[b.status]}33`,
                    }}
                  >
                    {b.status}
                  </span>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-gold)", marginTop: "0.25rem" }}>
                    {b.totalMAD} MAD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet status */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-cream)" }}>
              Fleet Status
            </h2>
            <Link
              href="/admin/bikes"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-gold)", textDecoration: "none" }}
            >
              Manage →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {defaultBikes.map((bike) => (
              <div
                key={bike.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  background: "rgba(255,248,237,0.04)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-cream)" }}>
                    {bike.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                    {bike.category} · {bike.engine}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`status-badge ${bike.available ? "status-active" : "status-inactive"}`}>
                    {bike.available ? "Available" : "Rented"}
                  </span>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-gold)", marginTop: "0.25rem" }}>
                    {bike.priceMAD} MAD/day
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
